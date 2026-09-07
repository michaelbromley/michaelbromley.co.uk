---
date: 2026-09-07T08:00:00+01:00
title: The Problem With Your AI Tests
type: post
categories:
  - post
  - featured
tags:
  - essay
  - testing
ogimage: media/2026/09/weak-assertions.webp
ogimagealt: A code diff on a dark terminal window, removing two weak assertions that use toBeGreaterThanOrEqual and toBeTruthy, and replacing them with exact assertions that use toBe.
---

Now that AI is writing all our code, we need to concern ourselves with two questions:

1. Is the code base maintainable?
2. Does it work?

In this post I want to talk about the second point: does it work? We have 3 ways to answer that:

1. try it out yourself
2. your users tell you it's broken
3. automated tests

The first two didn't really change very much with AI. The third one did, in a couple of important ways.

- it's now really easy to write tests, and AI is very, very good at certain aspects of creating tests
- current gen AI can also be exceedingly bad at writing tests

{{< figure src="/media/2026/09/weak-assertions.webp" alt="A code diff on a dark terminal window, removing two weak assertions that use toBeGreaterThanOrEqual and toBeTruthy, and replacing them with exact assertions that use toBe." >}}

I have long said that Vendure's test suite is the most important part of the code base. It contains about 2000 hand-written end-to-end API tests and maybe a thousand more unit tests. It lets us move fast with a very high degree of confidence.

Writing that many tests took many years. New projects are not going to put that much human labour into writing tests anymore. So we need to make sure that the tests that AI generates are not shit.

Simply mandating "ensure all new functionality is tested" will result in _lots_ of tests, lots more code to maintain, but not necessarily the degree of confidence you would expect.

## Beware AI-generated tests

Here are the ways in which AI will lull you into a false sense of security with lots of tests that look good on the surface but are decidedly not.

### Tautologies

A "tautology" is defined as "a statement that is true by virtue of its logical form alone" (Merriam-Webster). Example: _"Who survives? The fittest. Who are the fittest? Those that survive."_

AI loves to write tautological tests, where they only test the very code in the setup. Changes to your actual business logic have no bearing on such tests.

```ts
// BAD
it('calculates the gross price', () => {
  const netPrice = 1000;
  const taxRate = 20;
  const expected = netPrice + (netPrice * taxRate) / 100;

  expect(netPrice + (netPrice * taxRate) / 100).toBe(expected);
});
```

That one's obvious of course. Tautology is usually a little more hidden than that, often via a mock:

```ts
// BAD
it('returns the customer for an order', async () => {
  const customer = { id: '1', firstName: 'Ada', emailAddress: 'ada@test.com' };
  vi.mocked(customerService.findOne).mockResolvedValue(customer);

  const result = await orderService.getCustomerForOrder('order-1');

  expect(result.firstName).toBe(customer.firstName);
  expect(result.emailAddress).toBe(customer.emailAddress);
});
```

Sometimes the mock setup is far removed from the test assertion, at the top of the file. At first glance these kind of test can look legit.

The ultimate in tautological tests is when it _does not even import the function under test_, but re-implements a completely new version of it in the test file. Yes, this happens.

### Weak assertions

Instead of testing the exact outcome we expect, AI will often test for something _in that general direction_. This is a weak assertion. If we _know_ that the result should be `3`, it might test for _is greater than zero_ or _is not null_. Sure, true statements to make, but they leave almost infinite wrong outcomes still on the table.

```ts
// BAD
it('applies a 10% discount', () => {
  const order = createOrder({ lines: [{ unitPrice: 1000, quantity: 2 }] });

  const result = applyDiscount(order, { type: 'percentage', value: 10 });

  expect(result.total).toBeGreaterThanOrEqual(0);
  expect(result.discountApplied).toBeTruthy();
  expect(result.adjustments).toBeDefined();
});
```

The test above allows the code to break in all sorts of serious ways without reporting any problems.

### Missing edge cases

This is one you would think AI would be great at, but unless you specifically ask, it will tend to test only
the happy path.

```ts
// BAD
it('calculates the average', () => {
  expect(average([1, 2, 3])).toBe(2);
});
```

One thing that AI is actually good at is imagining and writing tests for variant cases, but somehow it often needs
to be specifically asked for this:

```ts
// GOOD
describe('average', () => {
  it('calculates the mean of several numbers', () => {
    expect(average([1, 2, 3])).toBe(2);
  });

  it('returns the number itself for a single value', () => {
    expect(average([7])).toBe(7);
  });

  it('returns 0 for an empty array', () => {
    expect(average([])).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(average([-10, 10])).toBe(0);
  });
});
```

### Conditional tests

This class is particularly egregious. AI will sometimes write conditional tests that are explicitly designed to pass no matter what the code under test does. It's like the AI built graceful error handling into the test suite.

```ts
// BAD
it('refunds the payment', async () => {
  const result = await paymentService.refund(order, 500);

  if (result.success) {
    expect(result.refundedAmount).toBe(500);
  } else {
    expect(result.errorCode).toBeDefined();
  }
});
```

## How to prevent this

You could read the code of course. But if we're being honest, reading the code is going away for 90%+ of the work we do.

Luckily, a very effective weapon against these maladies is a dedicated sub-agent pass which explicitly looks for the following:

```
**Tear Apart Tests**: AI-generated tests are a particular minefield. Be ruthless about test quality:
    - **Weak assertions**: `.toBeGreaterThanOrEqual()`, `.toBeTruthy()`, `.toBeDefined()` when `.toBe()`
      or `.toEqual()` with an exact value is what's needed. A test that passes for the right AND wrong
      value is worthless.
    - **Conditional test logic**: `if (result.works) { expect(X) } else { expect(Y) }` — tests with
      branching logic that guarantee a pass regardless of actual behavior. Tests must have a single
      deterministic assertion path.
    - **Tautological tests**: Tests that assert their own internal logic rather than exercising the code
      under test. If the test constructs a value and then asserts that same value, it tells you nothing
      about the system.
    - **Missing edge cases**: Only testing the happy path. Where are the error cases, boundary
      conditions, empty inputs?
    - **Test setup that mirrors implementation**: When the test essentially re-implements the production
      logic to derive the expected value, it will always pass — even if both are wrong.
```

I just checked one of our projects where we run a version of this, and it caught issues in 30% of PRs. Try it on your AI-generated test suite.
