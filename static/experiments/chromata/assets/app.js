"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Chromata = (function () {
  function Chromata(imageElement) {
    var _this = this;
    var options = arguments[1] === undefined ? {} : arguments[1];
    var renderCanvas = document.createElement("canvas"),
        renderContext = renderCanvas.getContext("2d"),
        sourceCanvas = document.createElement("canvas"),
        sourceContext = sourceCanvas.getContext("2d"),
        image = new Image(),
        dimensions,
        ready = false;

    this.options = this._mergeOptions(options);

    image.src = imageElement.src;
    image.addEventListener("load", function () {
      dimensions = Utils._getOutputDimensions(imageElement, _this.options.outputSize);
      sourceCanvas.width = renderCanvas.width = dimensions.width;
      sourceCanvas.height = renderCanvas.height = dimensions.height;
      sourceContext.drawImage(image, 0, 0, dimensions.width, dimensions.height);

      _this.dimensions = dimensions;
      _this.imageArray = Utils._getImageArray(sourceContext);
      _this.workingArray = Utils._getWorkingArray(sourceContext);

      ready = true;
    });

    this.loader = function (callback) {
      if (!ready) {
        setTimeout(function () {
          return _this.loader(callback);
        }, 50);
      } else {
        callback();
      }
    };

    this.imageArray = [];
    this.sourceImageElement = imageElement;
    this.sourceContext = sourceContext;
    this.renderContext = renderContext;
    this.isRunning = false;
    this.iterationCount = 0;
  }

  _prototypeProperties(Chromata, null, {
    start: {

      /**
       * Start the animation.
       */
      value: function start() {
        var _this2 = this;
        this.loader(function () {
          _this2.isRunning = true;

          if (typeof _this2._tick === "undefined") {
            _this2._run();
          } else {
            _this2._tick();
          }
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    stop: {

      /**
       * Stop the animation. Returns the current iteration count.
       * @returns {number}
       */
      value: function stop() {
        this.isRunning = false;
        return this.iterationCount;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    toggle: {

      /**
       * Start/stop the animation. If stopping, return the current iteration count.
       * @returns {*}
       */
      value: function toggle() {
        if (this.isRunning) {
          return this.stop();
        } else {
          return this.start();
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    reset: {

      /**
       * Clear the canvas and set the animation back to the start.
       */
      value: function reset() {
        this.isRunning = false;
        this._tick = undefined;
        cancelAnimationFrame(this.raf);
        this.renderContext.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.workingArray = Utils._getWorkingArray(this.sourceContext);
        this._removeRenderCanvas();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _mergeOptions: {

      /**
       * Merge any user-supplied config options with the defaults and perform some validation.
       * @param options
       * @private
       */
      value: function MergeOptions(options) {
        var defaults = {
          backgroundColor: "rgba(255, 255, 255, 0)",
          colorMode: "color",
          compositeOperation: "lighten",
          iterationLimit: 0,
          key: "low",
          lineWidth: 2,
          lineMode: "smooth",
          origin: ["bottom"],
          outputSize: "original",
          pathFinderCount: 30,
          speed: 7,
          turningAngle: Math.PI
        };

        var merged = {};

        for (var prop in defaults) {
          if (defaults.hasOwnProperty(prop)) {
            merged[prop] = options[prop] || defaults[prop];
          }
        }

        // some validation
        merged.origin = merged.origin.constructor === Array ? merged.origin : defaults.origin;
        merged.pathFinderCount = this._limitToRange(merged.pathFinderCount, 1, 10000);
        merged.lineWidth = this._limitToRange(merged.lineWidth, 1, 100);
        merged.speed = this._limitToRange(merged.speed, 1, 100);
        merged.turningAngle = this._limitToRange(merged.turningAngle, 0.1, 10);

        return merged;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _limitToRange: {
      value: function LimitToRange(val, low, high) {
        return Math.min(Math.max(val, low), high);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _appendRenderCanvas: {

      /**
       * Hide the source image element and append the render canvas directly after it in the DOM.
       * @private
       */
      value: function AppendRenderCanvas() {
        var parentElement = this.sourceImageElement.parentNode;

        this.sourceImageElement.style.display = "none";
        this.renderContext.fillStyle = this.options.backgroundColor;
        this.renderContext.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
        parentElement.insertBefore(this.renderContext.canvas, this.sourceImageElement.nextSibling);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _removeRenderCanvas: {

      /**
       * Unhide the source image and remove the render canvas from the DOM.
       * @private
       */
      value: function RemoveRenderCanvas() {
        this.sourceImageElement.style.display = "";
        this.renderContext.canvas.parentNode.removeChild(this.renderContext.canvas);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _run: {

      /**
       * Set up the pathfinders and renderers and get the animation going.
       * @private
       */
      value: function Run() {
        var _this3 = this;


        var renderers = [],
            pathFinders = this._initPathFinders(),
            renderOptions = {
          colorMode: this.options.colorMode,
          lineWidth: this.options.lineWidth,
          lineMode: this.options.lineMode,
          speed: this.options.speed
        };

        this._appendRenderCanvas();

        this.renderContext.globalCompositeOperation = this.options.compositeOperation;

        pathFinders.forEach(function (pathFinder) {
          renderers.push(new PathRenderer(_this3.renderContext, pathFinder, renderOptions));
        });

        this._tick = function () {
          if (0 < _this3.options.iterationLimit && _this3.options.iterationLimit <= _this3.iterationCount) {
            _this3.isRunning = false;
            _this3.options.iterationLimit = 0;
          }

          renderers.forEach(function (renderer) {
            return renderer.drawNextLine();
          });
          _this3.iterationCount++;

          if (_this3.isRunning) {
            _this3.raf = requestAnimationFrame(_this3._tick);
          }
        };

        this._tick();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _initPathFinders: {

      /**
       * Create the pathfinders
       * @returns {Array}
       * @private
       */
      value: function InitPathFinders() {
        var _this4 = this;
        var pathFinders = [],
            count = this.options.pathFinderCount,
            origins = this.options.origin,
            pathFindersPerOrigin = count / origins.length,
            options = {
          speed: this.options.speed,
          turningAngle: this.options.turningAngle,
          key: this.options.key
        };

        if (-1 < origins.indexOf("bottom")) {
          this._seedBottom(pathFindersPerOrigin, pathFinders, options);
        }
        if (-1 < origins.indexOf("top")) {
          this._seedTop(pathFindersPerOrigin, pathFinders, options);
        }
        if (-1 < origins.indexOf("left")) {
          this._seedLeft(pathFindersPerOrigin, pathFinders, options);
        }
        if (-1 < origins.indexOf("right")) {
          this._seedRight(pathFindersPerOrigin, pathFinders, options);
        }

        origins.forEach(function (origin) {
          var matches = origin.match(/(\d{1,3})% (\d{1,3})%/);
          if (matches) {
            _this4._seedPoint(pathFindersPerOrigin, pathFinders, options, matches[1], matches[2]);
          }
        });

        return pathFinders;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _seedTop: {
      value: function SeedTop(count, pathFinders, options) {
        var _this5 = this;
        var width = this.dimensions.width,
            unit = width / count,
            xPosFn = function (i) {
          return unit * i - unit / 2;
        },
            yPosFn = function () {
          return _this5.options.speed;
        };

        options.startingVelocity = [0, this.options.speed];
        this._seedCreateLoop(count, pathFinders, xPosFn, yPosFn, options);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _seedBottom: {
      value: function SeedBottom(count, pathFinders, options) {
        var _this6 = this;
        var width = this.dimensions.width,
            height = this.dimensions.height,
            unit = width / count,
            xPosFn = function (i) {
          return unit * i - unit / 2;
        },
            yPosFn = function () {
          return height - _this6.options.speed;
        };

        options.startingVelocity = [0, -this.options.speed];
        this._seedCreateLoop(count, pathFinders, xPosFn, yPosFn, options);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _seedLeft: {
      value: function SeedLeft(count, pathFinders, options) {
        var _this7 = this;
        var height = this.dimensions.height,
            unit = height / count,
            xPosFn = function () {
          return _this7.options.speed;
        },
            yPosFn = function (i) {
          return unit * i - unit / 2;
        };

        options.startingVelocity = [this.options.speed, 0];
        this._seedCreateLoop(count, pathFinders, xPosFn, yPosFn, options);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _seedRight: {
      value: function SeedRight(count, pathFinders, options) {
        var _this8 = this;
        var width = this.dimensions.width,
            height = this.dimensions.height,
            unit = height / count,
            xPosFn = function () {
          return width - _this8.options.speed;
        },
            yPosFn = function (i) {
          return unit * i - unit / 2;
        };

        options.startingVelocity = [-this.options.speed, 0];
        this._seedCreateLoop(count, pathFinders, xPosFn, yPosFn, options);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _seedPoint: {
      value: function SeedPoint(count, pathFinders, options, xPc, yPc) {
        var xPos = Math.floor(this.dimensions.width * xPc / 100),
            yPos = Math.floor(this.dimensions.height * yPc / 100);

        for (var i = 1; i < count + 1; i++) {
          var color = Utils._indexToRgbString(i),
              direction = i % 4;

          switch (direction) {
            case 0:
              options.startingVelocity = [-this.options.speed, 0];
              break;
            case 1:
              options.startingVelocity = [0, this.options.speed];
              break;
            case 2:
              options.startingVelocity = [this.options.speed, 0];
              break;
            case 3:
              options.startingVelocity = [0, -this.options.speed];
              break;
          }

          pathFinders.push(new PathFinder(this.imageArray, this.workingArray, color, xPos, yPos, options));
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _seedCreateLoop: {
      value: function SeedCreateLoop(count, pathFinders, xPosFn, yPosFn, options) {
        for (var i = 1; i < count + 1; i++) {
          var color = Utils._indexToRgbString(i),
              xPos = xPosFn(i),
              yPos = yPosFn(i);

          pathFinders.push(new PathFinder(this.imageArray, this.workingArray, color, xPos, yPos, options));
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Chromata;
})();

var MAX = 255;

var PathFinder = (function () {
  function PathFinder(pixelArray, workingArray, targetColor) {
    var initX = arguments[3] === undefined ? 0 : arguments[3];
    var initY = arguments[4] === undefined ? 0 : arguments[4];
    var options = arguments[5] === undefined ? {} : arguments[5];
    this.pixelArray = pixelArray;
    this.workingArray = workingArray;
    this.arrayWidth = pixelArray[0].length;
    this.arrayHeight = pixelArray.length;
    this.x = Math.round(initX);
    this.y = Math.round(initY);
    this.options = options;
    this.pathQueue = new PathQueue(10);
    this.velocity = options.startingVelocity;

    this.targetColor = typeof targetColor === "string" ? this._hexToRgb(targetColor) : targetColor;
    this.rgbIndex = this._getRgbIndex(this.targetColor);

    if (this.options.key === "low") {
      this.comparatorFn = function (distance, closest) {
        return 0 < distance && distance < closest;
      };
    } else {
      this.comparatorFn = function (distance, closest) {
        return closest < distance && distance < MAX;
      };
    }
  }

  _prototypeProperties(PathFinder, null, {
    getNextPoint: {

      /**
       * Get next coordinate point in path.
       *
       * @returns {[int, int, int]}
       */
      value: function getNextPoint() {
        var result,
            i = 0,
            limit = 5; // prevent an infinite loop

        do {
          result = this._getNextPixel();
          i++;
        } while (i <= limit && result.isPristine === false);

        return result.nextPixel;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getNextPixel: {

      /**
       * Algorithm for finding the next point by picking the closest match out of an arc-shaped array of possible pixels
       * arranged pointing in the direction of velocity.
       *
       * @returns {{nextPixel: [int, int, int], isPristine: boolean}}
       * @private
       */
      value: function GetNextPixel() {
        var theta = this._getVelocityAngle(),
            isPristine,
            closestColor = this.options.key === "low" ? 100000 : 0,
            nextPixel,
            defaultNextPixel,
            arcSize = this.options.turningAngle,
            radius = Math.round(Math.sqrt(Math.pow(this.velocity[0], 2) + Math.pow(this.velocity[1], 2))),
            sampleSize = 4; // how many surrounding pixels to test for next point

        for (var angle = theta - arcSize / 2, deviance = -sampleSize / 2; angle <= theta + arcSize / 2; angle += arcSize / sampleSize, deviance++) {
          var x = this.x + Math.round(radius * Math.cos(angle)),
              y = this.y + Math.round(radius * Math.sin(angle)),
              colorDistance = MAX;

          if (this._isInRange(x, y)) {
            var visited = this.workingArray[y][x][this.rgbIndex],
                currentPixel = this.pixelArray[y][x],
                alpha = currentPixel[3];

            colorDistance = this._getColorDistance(currentPixel);

            if (this.comparatorFn(colorDistance, closestColor) && !visited && alpha === MAX) {
              nextPixel = [x, y, MAX - colorDistance];
              closestColor = colorDistance;
            }
          }

          if (deviance === 0) {
            if (this.pixelArray[y][x][3] === MAX) {
              defaultNextPixel = [x, y, MAX - colorDistance];
            } else {
              defaultNextPixel = this.pathQueue.get(-2);
            }
          }
        }

        isPristine = typeof nextPixel !== "undefined";
        nextPixel = nextPixel || defaultNextPixel;

        this.velocity = [nextPixel[0] - this.x, nextPixel[1] - this.y];
        this.y = nextPixel[1];
        this.x = nextPixel[0];
        this._updateWorkingArray(nextPixel[1], nextPixel[0]);
        this.pathQueue.put(nextPixel);

        return {
          nextPixel: nextPixel,
          isPristine: isPristine
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getColor: {

      /**
       * Get an [r, g, b] array of the target color.
       * @returns {{r: *, g: *, b: *}}
       */
      value: function getColor() {
        return {
          r: this.targetColor[0],
          g: this.targetColor[1],
          b: this.targetColor[2]
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getVelocityAngle: {

      /**
       * Get the angle indicated by the velocity vector, correcting for the case that the angle would
       * take the pathfinder off the image canvas, in which case the angle will be set towards the
       * centre of the canvas.
       *
       * @returns {*}
       * @private
       */
      value: function GetVelocityAngle() {
        var projectedX = this.x + this.velocity[0],
            projectedY = this.y + this.velocity[1],
            margin = this.options.speed,
            angle;

        if (projectedX <= margin) {
          angle = 0;
        } else if (this.arrayWidth - margin <= projectedX) {
          angle = Math.PI;
        } else if (projectedY <= margin) {
          angle = Math.PI / 2;
        } else if (this.arrayHeight - margin <= projectedY) {
          angle = 3 / 2 * Math.PI;
        } else {
          var dy = this.y + this.velocity[1] - this.y;
          var dx = this.x + this.velocity[0] - this.x;
          angle = Math.atan2(dy, dx);
        }

        return angle;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _hexToRgb: {

      /**
       * From http://stackoverflow.com/a/5624139/772859
       * @param hex
       * @returns {{r: Number, g: Number, b: Number}}
       * @private
       */
      value: function HexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
          return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getColorDistance: {
      value: function GetColorDistance(pixel) {
        return MAX - pixel[this.rgbIndex];
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _isInRange: {

      /**
       * Return true if the x, y points lie within the image dimensions.
       * @param x
       * @param y
       * @returns {boolean}
       * @private
       */
      value: function IsInRange(x, y) {
        return 0 < x && x < this.arrayWidth && 0 < y && y < this.arrayHeight;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _updateWorkingArray: {
      value: function UpdateWorkingArray(row, col) {
        this.workingArray[row][col][this.rgbIndex] = true;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getRgbIndex: {
      value: function GetRgbIndex(targetColorArray) {
        var i;
        for (i = 0; i < 2; i++) {
          if (targetColorArray[i] !== 0) {
            break;
          }
        }

        return i;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return PathFinder;
})();

/**
 * Implementation of a queue of a fixed size.
 */
var PathQueue = (function () {
  function PathQueue(size) {
    this.queue = [];
    this.size = size;
  }

  _prototypeProperties(PathQueue, null, {
    put: {

      /**
       * Put a new item in the queue. If this causes the queue to exceed its size limit, the oldest
       * item will be discarded.
       * @param item
       */
      value: function put(item) {
        this.queue.push(item);
        if (this.size < this.queue.length) {
          this.queue.shift();
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    get: {

      /**
       * Get an item from the queue, specified by index. 0 gets the oldest item in the queue, 1 the second oldest etc.
       * -1 gets the newest item, -2 the second newest etc.
       *
       * @param index
       * @returns {*}
       */
      value: function get() {
        var index = arguments[0] === undefined ? 0 : arguments[0];
        var length = this.queue.length;
        if (0 <= index && index <= length) {
          return this.queue[index];
        } else if (index < 0 && Math.abs(index) <= length) {
          return this.queue[length + index];
        } else {
          return undefined;
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    contains: {
      value: function contains(item) {
        var matches = this.queue.filter(function (point) {
          return point[0] === item[0] && point[1] === item[1];
        });

        return 0 < matches.length;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return PathQueue;
})();

/**
 * Renders the points created by a Pathfinder
 */
var PathRenderer = (function () {
  function PathRenderer(context, pathFinder, options) {
    this.context = context;
    this.pathFinder = pathFinder;
    this.options = options;
    this.color = pathFinder.getColor();
  }

  _prototypeProperties(PathRenderer, null, {
    drawNextLine: {
      value: function drawNextLine() {
        if (this.options.lineMode === "smooth") {
          this._drawLineSmooth();
        } else {
          this._drawLineSquare();
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _drawLineSmooth: {
      value: function DrawLineSmooth() {
        var midX,
            midY,
            midColor,
            lineLength,
            nextPoint = this.pathFinder.getNextPoint(this.context);

        if (typeof this.currentPoint === "undefined") {
          this.currentPoint = nextPoint;
        }
        if (typeof this.controlPoint === "undefined") {
          this.controlPoint = nextPoint;
        }

        midX = Math.round((this.controlPoint[0] + nextPoint[0]) / 2);
        midY = Math.round((this.controlPoint[1] + nextPoint[1]) / 2);
        midColor = Math.floor((this.currentPoint[2] + nextPoint[2]) / 2);
        lineLength = this._getLineLength(this.currentPoint, nextPoint);

        if (lineLength <= this.options.speed * 3) {
          var grad = undefined,
              startColorValue = this.currentPoint[2],
              endColorValue = nextPoint[2];

          grad = this._createGradient(this.currentPoint, nextPoint, startColorValue, endColorValue);
          this.context.strokeStyle = grad;

          this.context.lineWidth = this.options.lineWidth;
          this.context.lineCap = "round";
          this.context.beginPath();

          this.context.moveTo(this.currentPoint[0], this.currentPoint[1]);
          this.context.quadraticCurveTo(this.controlPoint[0], this.controlPoint[1], midX, midY);
          this.context.stroke();
        }

        this.currentPoint = [midX, midY, midColor];
        this.controlPoint = nextPoint;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _drawLineSquare: {
      value: function DrawLineSquare() {
        var lineLength,
            nextPoint = this.pathFinder.getNextPoint(this.context);

        if (typeof this.currentPoint === "undefined") {
          this.currentPoint = nextPoint;
        }

        lineLength = this._getLineLength(this.currentPoint, nextPoint);

        if (lineLength <= this.options.speed + 1) {
          var grad = undefined,
              startColorValue = this.currentPoint[2],
              endColorValue = nextPoint[2];

          grad = this._createGradient(this.currentPoint, nextPoint, startColorValue, endColorValue);

          this.context.strokeStyle = grad;
          this.context.lineWidth = this.options.lineWidth;
          this.context.lineCap = "round";
          this.context.beginPath();

          this.context.moveTo(this.currentPoint[0], this.currentPoint[1]);
          this.context.lineTo(nextPoint[0], nextPoint[1]);
          this.context.stroke();
        }
        this.currentPoint = nextPoint;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getLineLength: {
      value: function GetLineLength(p1, p2) {
        var dx = p2[0] - p1[0];
        var dy = p2[1] - p1[1];
        return Math.round(Math.sqrt(dx * dx + dy * dy));
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _createGradient: {
      value: function CreateGradient(p1, p2, color1, color2) {
        var grad = this.context.createLinearGradient(p1[0], p1[1], p2[0], p2[1]);
        grad.addColorStop(0, this._getStrokeColor(color1));
        grad.addColorStop(1, this._getStrokeColor(color2));
        return grad;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getStrokeColor: {

      /**
       * Get an rgba color string based on the color value and the pathRenderer's color and color mode.
       *
       * @param colorValue
       * @returns {*}
       * @private
       */
      value: function GetStrokeColor(colorValue) {
        var colorString;

        if (this.options.colorMode === "color") {
          colorString = "rgba(" + (this.color.r !== 0 ? colorValue : 0) + ", " + (this.color.g !== 0 ? colorValue : 0) + ", " + (this.color.b !== 0 ? colorValue : 0) + ", " + 1 + ")";
        } else {
          // greyscale
          colorString = "rgba(" + colorValue + ", " + colorValue + ", " + colorValue + ", " + 1 + ")";
        }

        return colorString;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return PathRenderer;
})();

/**
 * Static utilities class containing helper functions
 */
var Utils = (function () {
  function Utils() {}

  _prototypeProperties(Utils, {
    _indexToRgbString: {
      value: function IndexToRgbString(i) {
        var color;
        if (i % 3 === 0) {
          color = "#0000ff";
        } else if (i % 2 === 0) {
          color = "#00ff00";
        } else {
          color = "#ff0000";
        }
        return color;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getImageArray: {

      /**
       * Get a 2d array (width x height) representing each pixel of the source as an [r,g,b,a] array.
       * @param sourceContext
       */
      value: function GetImageArray(sourceContext) {
        var width = sourceContext.canvas.width,
            height = sourceContext.canvas.height,
            imageData = sourceContext.getImageData(0, 0, width, height),
            imageArray = [];

        for (var row = 0; row < height; row++) {
          imageArray.push([]);

          for (var col = 0; col < width; col++) {
            var pixel = [],
                position = row * width * 4 + col * 4;

            for (var part = 0; part < 4; part++) {
              pixel[part] = imageData.data[position + part];
            }

            imageArray[row].push(pixel);
          }
        }

        return imageArray;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getWorkingArray: {

      /**
       * Create a 2d array with the same dimensions as the image, but filled with "null" pixels that
       * will get filled in when a pathFinder visits each pixel. Allows multiple pathFinders to
       * communicate which pixels have been covered.
       *
       * @param sourceContext
       * @returns {Array}
       * @private
       */
      value: function GetWorkingArray(sourceContext) {
        var width = sourceContext.canvas.width,
            height = sourceContext.canvas.height,
            workingArray = [];

        for (var row = 0; row < height; row++) {
          workingArray.push([]);

          for (var col = 0; col < width; col++) {
            workingArray[row].push([false, false, false]);
          }
        }

        return workingArray;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _getOutputDimensions: {
      value: function GetOutputDimensions(image, size) {
        var width, height;

        if (size === "original") {
          width = image.width;
          height = image.height;
        } else {
          var container = image.parentNode,
              ratioW = container.clientWidth / image.width,
              ratioH = container.clientHeight / image.height,
              smallerRatio = ratioH <= ratioW ? ratioH : ratioW;

          width = image.width * smallerRatio;
          height = image.height * smallerRatio;
        }

        return {
          width: width,
          height: height
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Utils;
})();
"use strict";

!(function (e) {
  "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define([], function () {
    return window.hljs;
  }));
})(function (e) {
  function n(e) {
    return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
  }function t(e) {
    return e.nodeName.toLowerCase();
  }function r(e, n) {
    var t = e && e.exec(n);return t && 0 == t.index;
  }function a(e) {
    var n = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);return (n = n.map(function (e) {
      return e.replace(/^lang(uage)?-/, "");
    }), n.filter(function (e) {
      return N(e) || /no(-?)highlight/.test(e);
    })[0]);
  }function o(e, n) {
    var t = {};for (var r in e) t[r] = e[r];if (n) for (var r in n) t[r] = n[r];return t;
  }function i(e) {
    var n = [];return ((function r(e, a) {
      for (var o = e.firstChild; o; o = o.nextSibling) 3 == o.nodeType ? a += o.nodeValue.length : 1 == o.nodeType && (n.push({ event: "start", offset: a, node: o }), a = r(o, a), t(o).match(/br|hr|img|input/) || n.push({ event: "stop", offset: a, node: o }));return a;
    })(e, 0), n);
  }function c(e, r, a) {
    function o() {
      return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r;
    }function i(e) {
      function r(e) {
        return " " + e.nodeName + "=\"" + n(e.value) + "\"";
      }l += "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
    }function c(e) {
      l += "</" + t(e) + ">";
    }function u(e) {
      ("start" == e.event ? i : c)(e.node);
    }for (var s = 0, l = "", f = []; e.length || r.length;) {
      var g = o();if ((l += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e)) {
        f.reverse().forEach(c);do u(g.splice(0, 1)[0]), g = o(); while (g == e && g.length && g[0].offset == s);f.reverse().forEach(i);
      } else "start" == g[0].event ? f.push(g[0].node) : f.pop(), u(g.splice(0, 1)[0]);
    }return l + n(a.substr(s));
  }function u(e) {
    function n(e) {
      return e && e.source || e;
    }function t(t, r) {
      return RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }function r(a, i) {
      if (!a.compiled) {
        if ((a.compiled = !0, a.k = a.k || a.bK, a.k)) {
          var c = {},
              u = function (n, t) {
            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
              var t = e.split("|");c[t[0]] = [n, t[1] ? Number(t[1]) : 1];
            });
          };"string" == typeof a.k ? u("keyword", a.k) : Object.keys(a.k).forEach(function (e) {
            u(e, a.k[e]);
          }), a.k = c;
        }a.lR = t(a.l || /\b[A-Za-z0-9_]+\b/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);var s = [];a.c.forEach(function (e) {
          e.v ? e.v.forEach(function (n) {
            s.push(o(e, n));
          }) : s.push("self" == e ? a : e);
        }), a.c = s, a.c.forEach(function (e) {
          r(e, a);
        }), a.starts && r(a.starts, i);var l = a.c.map(function (e) {
          return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
        }).concat([a.tE, a.i]).map(n).filter(Boolean);a.t = l.length ? t(l.join("|"), !0) : { exec: function () {
            return null;
          } };
      }
    }r(e);
  }function s(e, t, a, o) {
    function i(e, n) {
      for (var t = 0; t < n.c.length; t++) if (r(n.c[t].bR, e)) {
        return n.c[t];
      }
    }function c(_x, _x2) {
      _function: while (true) {
        var e = _x,
            n = _x2;
        if (r(e.eR, n)) {
          return e;
        } else {
          if (e.eW) {
            _x = e.parent;
            _x2 = n;
            continue _function;
          } else {
            return void 0;
          }
        }
      }
    }function f(e, n) {
      return !a && r(n.iR, e);
    }function g(e, n) {
      var t = x.cI ? n[0].toLowerCase() : n[0];return e.k.hasOwnProperty(t) && e.k[t];
    }function p(e, n, t, r) {
      var a = r ? "" : E.classPrefix,
          o = "<span class=\"" + a,
          i = t ? "" : "</span>";return (o += e + "\">", o + n + i);
    }function d() {
      if (!w.k) {
        return n(y);
      }var e = "",
          t = 0;w.lR.lastIndex = 0;for (var r = w.lR.exec(y); r;) {
        e += n(y.substr(t, r.index - t));var a = g(w, r);a ? (B += a[1], e += p(a[0], n(r[0]))) : e += n(r[0]), t = w.lR.lastIndex, r = w.lR.exec(y);
      }return e + n(y.substr(t));
    }function h() {
      if (w.sL && !R[w.sL]) {
        return n(y);
      }var e = w.sL ? s(w.sL, y, !0, L[w.sL]) : l(y);return (w.r > 0 && (B += e.r), "continuous" == w.subLanguageMode && (L[w.sL] = e.top), p(e.language, e.value, !1, !0));
    }function v() {
      return void 0 !== w.sL ? h() : d();
    }function b(e, t) {
      var r = e.cN ? p(e.cN, "", !0) : "";e.rB ? (M += r, y = "") : e.eB ? (M += n(t) + r, y = "") : (M += r, y = t), w = Object.create(e, { parent: { value: w } });
    }function m(e, t) {
      if ((y += e, void 0 === t)) {
        return (M += v(), 0);
      }var r = i(t, w);if (r) {
        return (M += v(), b(r, t), r.rB ? 0 : t.length);
      }var a = c(w, t);if (a) {
        var o = w;o.rE || o.eE || (y += t), M += v();do w.cN && (M += "</span>"), B += w.r, w = w.parent; while (w != a.parent);return (o.eE && (M += n(t)), y = "", a.starts && b(a.starts, ""), o.rE ? 0 : t.length);
      }if (f(t, w)) throw new Error("Illegal lexeme \"" + t + "\" for mode \"" + (w.cN || "<unnamed>") + "\"");return (y += t, t.length || 1);
    }var x = N(e);if (!x) throw new Error("Unknown language: \"" + e + "\"");u(x);for (var w = o || x, L = {}, M = "", k = w; k != x; k = k.parent) k.cN && (M = p(k.cN, "", !0) + M);var y = "",
        B = 0;try {
      for (var C, j, I = 0;;) {
        if ((w.t.lastIndex = I, C = w.t.exec(t), !C)) break;j = m(t.substr(I, C.index - I), C[0]), I = C.index + j;
      }m(t.substr(I));for (var k = w; k.parent; k = k.parent) k.cN && (M += "</span>");return { r: B, value: M, language: e, top: w };
    } catch (A) {
      if (-1 != A.message.indexOf("Illegal")) {
        return { r: 0, value: n(t) };
      }throw A;
    }
  }function l(e, t) {
    t = t || E.languages || Object.keys(R);var r = { r: 0, value: n(e) },
        a = r;return (t.forEach(function (n) {
      if (N(n)) {
        var t = s(n, e, !1);t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
      }
    }), a.language && (r.second_best = a), r);
  }function f(e) {
    return (E.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
      return n.replace(/\t/g, E.tabReplace);
    })), E.useBR && (e = e.replace(/\n/g, "<br>")), e);
  }function g(e, n, t) {
    var r = n ? x[n] : t,
        a = [e.trim()];return (e.match(/(\s|^)hljs(\s|$)/) || a.push("hljs"), r && a.push(r), a.join(" ").trim());
  }function p(e) {
    var n = a(e);if (!/no(-?)highlight/.test(n)) {
      var t;E.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;var r = t.textContent,
          o = n ? s(n, r, !0) : l(r),
          u = i(t);if (u.length) {
        var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");p.innerHTML = o.value, o.value = c(u, i(p), r);
      }o.value = f(o.value), e.innerHTML = o.value, e.className = g(e.className, n, o.language), e.result = { language: o.language, re: o.r }, o.second_best && (e.second_best = { language: o.second_best.language, re: o.second_best.r });
    }
  }function d(e) {
    E = o(E, e);
  }function h() {
    if (!h.called) {
      h.called = !0;var e = document.querySelectorAll("pre code");Array.prototype.forEach.call(e, p);
    }
  }function v() {
    addEventListener("DOMContentLoaded", h, !1), addEventListener("load", h, !1);
  }function b(n, t) {
    var r = R[n] = t(e);r.aliases && r.aliases.forEach(function (e) {
      x[e] = n;
    });
  }function m() {
    return Object.keys(R);
  }function N(e) {
    return R[e] || R[x[e]];
  }var E = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
      R = {},
      x = {};return (e.highlight = s, e.highlightAuto = l, e.fixMarkup = f, e.highlightBlock = p, e.configure = d, e.initHighlighting = h, e.initHighlightingOnLoad = v, e.registerLanguage = b, e.listLanguages = m, e.getLanguage = N, e.inherit = o, e.IR = "[a-zA-Z][a-zA-Z0-9_]*", e.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: "\"", e: "\"", i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/ }, e.CLCM = { cN: "comment", b: "//", e: "$", c: [e.PWM] }, e.CBCM = { cN: "comment", b: "/\\*", e: "\\*/", c: [e.PWM] }, e.HCM = { cN: "comment", b: "#", e: "$", c: [e.PWM] }, e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e);
});hljs.registerLanguage("xml", function () {
  var t = "[A-Za-z0-9\\._:-]+",
      e = { b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php", subLanguageMode: "continuous" },
      c = { eW: !0, i: /</, r: 0, c: [e, { cN: "attribute", b: t, r: 0 }, { b: "=", r: 0, c: [{ cN: "value", c: [e], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s\/>]+/ }] }] }] };return { aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"], cI: !0, c: [{ cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, { cN: "comment", b: "<!--", e: "-->", r: 10 }, { cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { title: "style" }, c: [c], starts: { e: "</style>", rE: !0, sL: "css" } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { title: "script" }, c: [c], starts: { e: "</script>", rE: !0, sL: "javascript" } }, e, { cN: "pi", b: /<\?\w+/, e: /\?>/, r: 10 }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "title", b: /[^ \/><\n\t]+/, r: 0 }, c] }] };
});hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
      a = { cN: "function", b: c + "\\(", rB: !0, eE: !0, e: "\\(" };return { cI: !0, i: "[=/|']", c: [e.CBCM, { cN: "id", b: "\\#[A-Za-z0-9_-]+" }, { cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0 }, { cN: "attr_selector", b: "\\[", e: "\\]", i: "$" }, { cN: "pseudo", b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+" }, { cN: "at_rule", b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { cN: "at_rule", b: "@", e: "[{;]", c: [{ cN: "keyword", b: /\S+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [a, e.ASM, e.QSM, e.CSSNM] }] }, { cN: "tag", b: c, r: 0 }, { cN: "rules", b: "{", e: "}", i: "[^\\s]", r: 0, c: [e.CBCM, { cN: "rule", b: "[^\\s]", rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: "[A-Z\\_\\.\\-]+", e: ":", eE: !0, i: "[^\\s]", starts: { cN: "value", eW: !0, eE: !0, c: [a, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "hexcolor", b: "#[0-9A-Fa-f]+" }, { cN: "important", b: "!important" }] } }] }] }] };
});hljs.registerLanguage("javascript", function (r) {
  return { aliases: ["js"], k: { keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document" }, c: [{ cN: "pi", r: 10, v: [{ b: /^\s*('|")use strict('|")/ }, { b: /^\s*('|")use asm('|")/ }] }, r.ASM, r.QSM, r.CLCM, r.CBCM, r.CNM, { b: "(" + r.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [r.CLCM, r.CBCM, r.RM, { b: /</, e: />;/, r: 0, sL: "xml" }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [r.inherit(r.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, c: [r.CLCM, r.CBCM], i: /["'\(]/ }], i: /\[|%/ }, { b: /\$[(.]/ }, { b: "\\." + r.IR, r: 0 }] };
});
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ChromataPlayerDirective = (function () {
    /*@ngInject*/
    function ChromataPlayerDirective($timeout) {
        _classCallCheck(this, ChromataPlayerDirective);

        this.restrict = "E";
        this.replace = true;
        this.templateUrl = "scripts/app/components/chromataPlayer.tpl.html";
        this.scope = {
            src: "=",
            options: "=",
            isPlaying: "=?"
        };
        this.$timeout = $timeout;
    }
    ChromataPlayerDirective.$inject = ["$timeout"];

    _prototypeProperties(ChromataPlayerDirective, null, {
        link: {
            value: function link(scope, element) {
                var _this = this;
                var chromata,
                    imgElement = element[0].querySelector("img.original");

                scope.isPaused = true;
                scope.showIcons = false;
                scope.fullConfig = {};

                scope.$watch("isPlaying", function (val) {
                    if (typeof val !== "undefined") {
                        if (val) {
                            _this.$timeout(function () {
                                scope.toggle();
                                scope.isPaused = false;
                                scope.showIcons = true;
                            }, 700);
                        } else {
                            _this.$timeout(function () {
                                scope.isPaused = true;
                                scope.showIcons = false;
                                if (chromata) {
                                    chromata.reset();
                                }
                            }, 1000);
                        }
                    }
                });

                scope.toggle = function () {
                    if (typeof chromata === "undefined") {
                        chromata = new Chromata(imgElement, scope.options);
                        scope.fullConfig = chromata.options;
                    }
                    chromata.toggle();
                    scope.isPaused = !scope.isPaused;
                };

                scope.$on("scrollObserverTriggered", function (e, trigger) {
                    if (trigger.label === "showcase" && scope.isPaused && scope.isPlaying) {
                        scope.isPaused = false;
                        chromata.start();
                        scope.$apply();
                    }

                    if (trigger.label !== "showcase" && !scope.isPaused) {
                        scope.isPaused = true;
                        chromata.stop();
                        scope.$apply();
                    }
                });
            },
            writable: true,
            configurable: true
        }
    });

    return ChromataPlayerDirective;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InfoPaneDirective = (function () {
    /*@ngInject*/
    function InfoPaneDirective() {
        _classCallCheck(this, InfoPaneDirective);

        this.restrict = "E";
        this.replace = true;
        this.templateUrl = "scripts/app/components/infoPane.tpl.html";
        this.scope = {
            show: "=",
            image: "=",
            options: "=",
            fullConfig: "="
        };
    }

    _prototypeProperties(InfoPaneDirective, null, {
        link: {
            value: function link(scope) {
                scope.normalizedOptions = {};

                scope.$watch("fullConfig", normalizeOptions);

                function normalizeOptions() {
                    for (var option in scope.fullConfig) {
                        var value = scope.fullConfig[option],
                            isDefault = typeof scope.options[option] === "undefined";

                        if (option === "turningAngle") {
                            value = convertToPi(value);
                        }

                        scope.normalizedOptions[option] = {
                            value: value,
                            isDefault: isDefault
                        };
                    }
                }

                function convertToPi(value) {
                    var factor = Math.PI / value;
                    return factor + "π";
                }
            },
            writable: true,
            configurable: true
        }
    });

    return InfoPaneDirective;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ItemTitleListDirective = (function () {
    /*@ngInject*/
    function ItemTitleListDirective($timeout) {
        _classCallCheck(this, ItemTitleListDirective);

        this.restrict = "E";
        this.replace = true;
        this.templateUrl = "scripts/app/components/itemTitleList.tpl.html";
        this.$timeout = $timeout;
        this.scope = {
            items: "=",
            selectedIndex: "=",
            selectCallback: "&"
        };
    }
    ItemTitleListDirective.$inject = ["$timeout"];

    _prototypeProperties(ItemTitleListDirective, null, {
        link: {
            value: function link(scope, element) {
                var underline = element[0].querySelector(".underline");

                scope.select = function (index) {
                    scope.selectCallback({ index: index });
                };

                scope.$watch("selectedIndex", select);

                function select() {
                    var index = arguments[0] === undefined ? 0 : arguments[0];
                    var target = element[0].querySelectorAll("li")[index],
                        position = target.getBoundingClientRect(),
                        color = "hsl(" + position.left + ", 50%, 50%)";

                    underline.style.left = position.left + "px";
                    underline.style.width = target.clientWidth + "px";
                    underline.style.backgroundColor = color;
                }

                this.$timeout(select, 200);
            },
            writable: true,
            configurable: true
        }
    });

    return ItemTitleListDirective;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PlaygroundDirective = (function () {
    /*@ngInject*/
    function PlaygroundDirective() {
        _classCallCheck(this, PlaygroundDirective);

        this.restrict = "E";
        this.replace = true;
        this.templateUrl = "scripts/app/components/playground.tpl.html";
        this.scope = {};
    }

    _prototypeProperties(PlaygroundDirective, null, {
        link: {
            value: function link(scope, element) {
                var imageElement,
                    playerPanel = element[0].querySelector(".player-panel"),
                    dropbox = element[0].querySelector("#file-input"),
                    chromata;

                scope.config = {
                    backgroundColor: "#000000",
                    colorMode: "color",
                    compositeOperation: "lighten",
                    key: "low",
                    lineMode: "smooth",
                    lineWidth: 2,
                    origin: "bottom, 50% 50%, top",
                    pathFinderCount: 60,
                    speed: 7,
                    turningAngle: 0.5,
                    outputSize: "container"
                };

                scope.imageLoaded = 0;
                scope.isPaused = false;

                scope.$watch("imageLoaded", function (val) {
                    if (val && 0 < val) {
                        run();
                    }
                });

                scope.update = function () {
                    scope.playgroundForm.$setPristine();
                    run();
                };

                scope.toggle = function () {
                    scope.isPaused = !scope.isPaused;
                    chromata.toggle();
                };

                scope.saveImage = function (e) {
                    /*link.href = document.getElementById(canvasId).toDataURL();
                    link.download = filename;*/
                    var canvas = document.querySelector(".original-container>canvas");
                    var dataURL = canvas.toDataURL("image/png");
                    e.currentTarget.href = dataURL;
                };

                function run() {
                    playerPanel.style.backgroundColor = scope.config.backgroundColor;
                    imageElement = element[0].querySelector(".playground-source");
                    if (chromata) {
                        chromata.reset();
                    }
                    chromata = new Chromata(imageElement, getNormalizedConfig());
                    chromata.start();
                    scope.isPaused = false;
                }


                /**
                 * Proces the user-edited config object to make it compatible with what Chromata expects.
                 * @returns {{}}
                 */
                function getNormalizedConfig() {
                    var normalConfig = {};

                    for (var prop in scope.config) {
                        var val = scope.config[prop];

                        if (prop === "turningAngle") {
                            val *= Math.PI;
                        }
                        if (prop === "origin") {
                            val = val.split(",").map(function (str) {
                                return str.trim();
                            });
                        }

                        normalConfig[prop] = val;
                    }

                    normalConfig.outputSize = "container";

                    return normalConfig;
                }


                dropbox.addEventListener("dragenter", enter, false);
                dropbox.addEventListener("dragleave", leave, false);
                dropbox.addEventListener("dragover", doNothing, false);
                dropbox.addEventListener("drop", drop, false);

                var dragCounter = 0;
                function doNothing(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }

                function enter(e) {
                    dragCounter++;
                    e.stopPropagation();
                    e.preventDefault();

                    if (0 < dragCounter) {
                        dropbox.classList.add("over");
                    }
                }

                function leave(e) {
                    dragCounter--;
                    e.stopPropagation();
                    e.preventDefault();

                    if (dragCounter === 0) {
                        dropbox.classList.remove("over");
                    }
                }

                function drop(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    dropbox.classList.remove("over");
                    dropbox.parentNode.classList.add("full");

                    var dt = e.dataTransfer;
                    var files = dt.files;

                    handleFiles(files);
                }


                function handleFiles(files) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var imageType = /^image\//;

                        if (!imageType.test(file.type)) {
                            continue;
                        }

                        var imageElement = appendImage(".original-container", file, "playground-source");
                        var previewElement = appendImage("#file-input", file, "preview");


                        loadImageData([imageElement, previewElement], file);
                    }
                }

                function loadImageData(imgArray, file) {
                    var reader = new FileReader(),
                        onLoadHandler = function (e) {
                        imgArray.forEach(function (img) {
                            return img.src = e.target.result;
                        });
                        scope.$apply(function () {
                            scope.imageLoaded++;
                        });
                    };

                    reader.onload = onLoadHandler;
                    reader.readAsDataURL(file);
                }

                function appendImage(containerSelector, file, className) {
                    var img = document.createElement("img"),
                        container = document.querySelector(containerSelector),
                        existingImages = container.querySelectorAll("img");

                    if (0 < existingImages.length) {
                        existingImages = Array.prototype.slice.call(existingImages);
                        existingImages.forEach(function (img) {
                            return container.removeChild(img);
                        });
                    }

                    img.classList.add(className);
                    img.file = file;
                    container.appendChild(img);

                    return img;
                }
            },
            writable: true,
            configurable: true
        }
    });

    return PlaygroundDirective;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ShowcaseDirective = (function () {
    /*@ngInject*/
    function ShowcaseDirective(showcaseService) {
        _classCallCheck(this, ShowcaseDirective);

        this.restrict = "E";
        this.replace = true;
        this.templateUrl = "scripts/app/components/showcase.tpl.html";
        this.items = showcaseService.items;
        this.scope = true;
    }
    ShowcaseDirective.$inject = ["showcaseService"];

    _prototypeProperties(ShowcaseDirective, null, {
        link: {
            value: function link(scope, element) {
                var _this = this;
                scope.items = this.items;
                scope.selectedIndex = 0;
                this.setStyle(element[0], scope.selectedIndex);

                scope.next = function () {
                    if (scope.selectedIndex < scope.items.length - 1) {
                        scope.selectedIndex++;
                        _this.setStyle(element[0], scope.selectedIndex);
                    }
                };

                scope.prev = function () {
                    if (0 < scope.selectedIndex) {
                        scope.selectedIndex--;
                        _this.setStyle(element[0], scope.selectedIndex);
                    }
                };

                scope.goTo = function (index) {
                    scope.selectedIndex = index;
                    _this.setStyle(element[0], scope.selectedIndex);
                };
            },
            writable: true,
            configurable: true
        },
        setStyle: {
            value: function setStyle(element, index) {
                element.style.backgroundColor = this.items[index].bgcolor;
            },
            writable: true,
            configurable: true
        }
    });

    return ShowcaseDirective;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ObserveScrollDirective = (function () {
    /*@ngInject*/
    function ObserveScrollDirective(scrollObserverService) {
        _classCallCheck(this, ObserveScrollDirective);

        this.restrict = "A";
        this.scrollObserverService = scrollObserverService;
    }
    ObserveScrollDirective.$inject = ["scrollObserverService"];

    _prototypeProperties(ObserveScrollDirective, null, {
        link: {
            value: function link(scope, element, attrs) {
                var label = attrs.observeScroll,
                    yPos = this.cumulativeOffset(element[0]).top;

                this.scrollObserverService.addTrigger(label, yPos);
            },
            writable: true,
            configurable: true
        },
        cumulativeOffset: {
            value: function cumulativeOffset(element) {
                var top = 0,
                    left = 0;
                do {
                    top += element.offsetTop || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent;
                } while (element);

                return {
                    top: top,
                    left: left
                };
            },
            writable: true,
            configurable: true
        }
    });

    return ObserveScrollDirective;
})();

var ScrollObserverService = (function () {
    /*@ngInject*/
    function ScrollObserverService($rootScope, $window) {
        var _this = this;
        _classCallCheck(this, ScrollObserverService);

        var currentIndex = 0,
            lastYPos = 0;

        this.triggers = [];

        $window.addEventListener("scroll", function () {
            var currentYPos = $window.pageYOffset,
                delta = currentYPos - lastYPos,
                testIndex = currentIndex;

            lastYPos = currentYPos;

            if (0 < delta) {
                while (_this.triggers[testIndex + 1] && _this.triggers[testIndex + 1].yPos <= currentYPos) {
                    testIndex++;
                }
            } else if (delta < 0) {
                while (_this.triggers[testIndex - 1] && currentYPos <= _this.triggers[testIndex - 1].yPos) {
                    testIndex--;
                }
            }

            if (testIndex !== currentIndex) {
                currentIndex = testIndex;
                $rootScope.$broadcast("scrollObserverTriggered", _this.triggers[currentIndex]);
            }
        });
    }
    ScrollObserverService.$inject = ["$rootScope", "$window"];

    _prototypeProperties(ScrollObserverService, null, {
        addTrigger: {
            value: function addTrigger(label, yPos) {
                this.triggers.push({
                    label: label,
                    yPos: yPos
                });
            },
            writable: true,
            configurable: true
        }
    });

    return ScrollObserverService;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ShowcaseService = (function () {
    function ShowcaseService() {
        _classCallCheck(this, ShowcaseService);
    }

    _prototypeProperties(ShowcaseService, null, {
        items: {
            get: function () {
                return [{
                    title: "Title",
                    image: "assets/images/logo.jpg",
                    bgcolor: "black",
                    config: {
                        pathFinderCount: 27,
                        speed: 8,
                        outputSize: "container"
                    }
                }, {
                    title: "tetsuo",
                    image: "assets/images/tetsuo.jpg",
                    bgcolor: "black",
                    config: {
                        pathFinderCount: 120,
                        speed: 7,
                        lineWidth: 1,
                        lineMode: "square",
                        origin: ["50% 30%", "50% 20%", "45% 25%", "55% 25%", "bottom"],
                        outputSize: "container"
                    }
                }, {
                    title: "wien",
                    image: "assets/images/karls.jpg",
                    bgcolor: "black",
                    config: {
                        pathFinderCount: 30,
                        speed: 10,
                        turningAngle: Math.PI / 2,
                        lineWidth: 3,
                        outputSize: "container"
                    }
                }, {
                    title: "city lights",
                    image: "assets/images/nyc.jpg",
                    bgcolor: "black",
                    config: {
                        pathFinderCount: 60,
                        speed: 3,
                        origin: ["bottom", "left", "right"],
                        outputSize: "container"
                    }
                }, {
                    title: "face",
                    image: "assets/images/sketch.jpg",
                    bgcolor: "#dcdcdc",
                    credit: "https://www.flickr.com/photos/almostengineers/15491619544",
                    config: {
                        pathFinderCount: 40,
                        turningAngle: Math.PI / 1.5,
                        colorMode: "greyscale",
                        lineWidth: 1,
                        compositeOperation: "darken",
                        origin: ["40% 50%", "65% 50%"],
                        outputSize: "container",
                        key: "high"
                    }
                }];
            },
            configurable: true
        }
    });

    return ShowcaseService;
})();
"use strict";

function piFilter() {
    return function (input) {
        var val = input;

        if (typeof input === "number") {
            var factor = Math.PI / input;

            if (factor % 1 === 0) {
                val = factor + "π";
            }
        }

        return val;
    };
}
"use strict";

var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
function register(appName) {
    var app = angular.module(appName);

    return {
        directive: directive,
        controller: controller,
        service: service,
        provider: provider,
        factory: factory
    };

    function directive(name, constructorFn) {
        constructorFn = _normalizeConstructor(constructorFn);

        if (!constructorFn.prototype.compile) {
            // create an empty compile function if none was defined.
            constructorFn.prototype.compile = function () {};
        }

        var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

        // Decorate the compile method to automatically return the link method (if it exists)
        // and bind it to the context of the constructor (so `this` works correctly).
        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
        // returns `this.link` from within the compile function.
        _override(constructorFn.prototype, "compile", function () {
            return function () {
                originalCompileFn.apply(this, arguments);

                if (constructorFn.prototype.link) {
                    return constructorFn.prototype.link.bind(this);
                }
            };
        });

        var factoryArray = _createFactoryArray(constructorFn);

        app.directive(name, factoryArray);
        return this;
    }

    function controller(name, contructorFn) {
        app.controller(name, contructorFn);
        return this;
    }

    function service(name, contructorFn) {
        app.service(name, contructorFn);
        return this;
    }

    function provider(name, constructorFn) {
        app.provider(name, constructorFn);
        return this;
    }

    function factory(name, constructorFn) {
        constructorFn = _normalizeConstructor(constructorFn);
        var factoryArray = _createFactoryArray(constructorFn);
        app.factory(name, factoryArray);
        return this;
    }

    /**
     * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
     * we need to pull out the array of dependencies and add it as an $inject property of the
     * actual constructor function.
     * @param input
     * @returns {*}
     * @private
     */
    function _normalizeConstructor(input) {
        var constructorFn;

        if (input.constructor === Array) {
            //
            var injected = input.slice(0, input.length - 1);
            constructorFn = input[input.length - 1];
            constructorFn.$inject = injected;
        } else {
            constructorFn = input;
        }

        return constructorFn;
    }

    /**
     * Convert a constructor function into a factory function which returns a new instance of that
     * constructor, with the correct dependencies automatically injected as arguments.
     *
     * In order to inject the dependencies, they must be attached to the constructor function with the
     * `$inject` property annotation.
     *
     * @param constructorFn
     * @returns {Array.<T>}
     * @private
     */
    function _createFactoryArray(constructorFn) {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push(function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            //return new constructorFn(...args);
            var instance = _applyConstructor(constructorFn, args);
            for (var key in instance) {
                instance[key] = instance[key];
            }
            return instance;
        });

        return factoryArray;
    }

    /**
     * Clone a function
     * @param original
     * @returns {Function}
     */
    function _cloneFunction(original) {
        return function () {
            return original.apply(this, arguments);
        };
    }

    /**
     * Override an object's method with a new one specified by `callback`.
     * @param object
     * @param methodName
     * @param callback
     */
    function _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
    }
}
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var AppController =

/*@ngInject*/
["$rootScope", function AppController($rootScope) {
    var _this = this;
    _classCallCheck(this, AppController);

    this.currentScrollTrigger = "showcase";

    $rootScope.$on("scrollObserverTriggered", function (e, trigger) {
        _this.currentScrollTrigger = trigger.label;
        $rootScope.$apply();
    });
}];
"use strict";

angular.module("chromata", ["templates"]);


register("chromata").controller("AppController", AppController).service("showcaseService", ShowcaseService).service("scrollObserverService", ScrollObserverService).directive("showcase", ShowcaseDirective).directive("observeScroll", ObserveScrollDirective).directive("playground", PlaygroundDirective).directive("itemTitleList", ItemTitleListDirective).directive("chromataPlayer", ChromataPlayerDirective).directive("infoPane", InfoPaneDirective);



angular.element(document).ready(function () {
    angular.bootstrap(document, ["chromata"]);
});