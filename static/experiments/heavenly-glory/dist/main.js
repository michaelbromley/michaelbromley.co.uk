(() => {
  // src/scripts/engine/motionDetector.js
  var motionDetector = function() {
    var module = {}, canvasBlend, contextBlend, contextScale, lastImageData, regions = [], maxPixelCount = [], w, h, options, defaultOptions = {
      width: 320,
      height: 240,
      horizontalRegions: 3,
      verticalRegions: 3,
      displayDebugCanvas: true,
      sensitivity: 50
    };
    module.init = function(userOptions) {
      options = mergeOptions(userOptions, defaultOptions);
      w = options.width;
      h = options.height;
      createBlendCanvas();
      createScaleCanvas();
      createRegions(options.horizontalRegions, options.verticalRegions);
    };
    module.setSensitivity = function(val) {
      if (0 <= val && val <= 100) {
        if (typeof options === "undefined") {
          defaultOptions.sensitivity = val;
        } else {
          options.sensitivity = val;
        }
      }
    };
    module.analyze = function(contextOut, showDebugData) {
      var motionByRegion, motionData, scaledContext;
      scaledContext = scaleContextOut(contextOut);
      motionData = doBlend(scaledContext);
      motionByRegion = detectMotionByRegion(motionData.data);
      if (showDebugData) {
        contextBlend.canvas.style.display = "block";
        contextBlend.putImageData(motionData, 0, 0);
        drawRegions(motionByRegion);
      } else {
        contextBlend.canvas.style.display = "none";
      }
      return motionByRegion;
    };
    function mergeOptions(userOptions, defaultOptions2) {
      var mergedOptions = {};
      userOptions = userOptions || {};
      for (var option in defaultOptions2) {
        if (defaultOptions2.hasOwnProperty(option)) {
          mergedOptions[option] = typeof userOptions[option] !== "undefined" ? userOptions[option] : defaultOptions2[option];
        }
      }
      return mergedOptions;
    }
    function createBlendCanvas() {
      canvasBlend = document.createElement("canvas");
      canvasBlend.setAttribute("id", "canvas-blend");
      canvasBlend.setAttribute("width", w);
      canvasBlend.setAttribute("height", h);
      contextBlend = canvasBlend.getContext("2d");
      if (options.displayDebugCanvas) {
        document.body.appendChild(canvasBlend);
      }
    }
    function createScaleCanvas() {
      var c = document.createElement("canvas");
      c.setAttribute("width", w);
      c.setAttribute("height", h);
      contextScale = c.getContext("2d");
    }
    function createRegions(n, m) {
      var width = Math.floor(w / n), height = Math.floor(h / m), originX, originY;
      for (originY = 0; originY <= h - height; originY += height) {
        for (originX = 0; originX <= w - width; originX += width) {
          regions.push([originX, originY, width, height]);
        }
      }
    }
    function drawRegions(motionByRegion) {
      var alpha, pixelCount, r, region;
      contextBlend.strokeStyle = "red";
      for (r = regions.length - 1; 0 <= r; r--) {
        region = regions[r];
        if (!maxPixelCount[r] || maxPixelCount[r] < motionByRegion[r]) {
          maxPixelCount[r] = motionByRegion[r];
        }
        pixelCount = maxPixelCount[r];
        alpha = pixelCount / 100;
        contextBlend.beginPath();
        contextBlend.rect(region[0], region[1], region[2], region[3]);
        contextBlend.fillStyle = "rgba(255, 100, 100, " + alpha + ")";
        contextBlend.fill();
        contextBlend.stroke();
        if (5 < maxPixelCount[r]) {
          maxPixelCount[r] -= 2;
        }
      }
    }
    function detectMotionByRegion(data) {
      var i, r, region, totalWhitePixels = 0, whitePixelsByRegion = [], pixelsPerRegion, motionByRegion = [];
      for (r = regions.length - 1; 0 <= r; r--) {
        whitePixelsByRegion[r] = 0;
      }
      i = 0;
      while (i < data.length * 0.25) {
        if (data[i * 4] === 255) {
          region = getRegion(i);
          whitePixelsByRegion[region]++;
          totalWhitePixels++;
        }
        ++i;
      }
      pixelsPerRegion = regions[0][2] * regions[0][3];
      for (r = regions.length - 1; 0 <= r; r--) {
        motionByRegion[r] = whitePixelsByRegion[r] / pixelsPerRegion * 100;
      }
      return motionByRegion;
    }
    function getRegion(pos) {
      var i = pos, regionWidth = regions[0][2], regionHeight = regions[0][3], regionsPerRow = Math.floor(w / regionWidth), columnPos = (i % w === 0 ? w : i % w) - 1, columnIndex = Math.floor(columnPos / regionWidth), rowIndex = Math.floor(Math.floor(i / w) / regionHeight);
      return columnIndex + rowIndex * regionsPerRow;
    }
    function doBlend(contextOut) {
      var blendedData, sourceData = contextOut.getImageData(0, 0, w, h);
      if (!lastImageData) {
        lastImageData = contextOut.getImageData(0, 0, w, h);
      }
      blendedData = contextOut.createImageData(w, h);
      differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
      lastImageData = sourceData;
      return blendedData;
    }
    function differenceAccuracy(target, data1, data2) {
      var i;
      if (data1.length != data2.length) {
        return null;
      }
      i = 0;
      while (i < data1.length * 0.25) {
        var average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3;
        var average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3;
        var diff = threshold(fastAbs(average1 - average2));
        target[4 * i] = diff;
        target[4 * i + 1] = diff;
        target[4 * i + 2] = diff;
        target[4 * i + 3] = 255;
        ++i;
      }
    }
    function fastAbs(value) {
      return (value ^ value >> 31) - (value >> 31);
    }
    function threshold(value) {
      return value > options.sensitivity ? 255 : 0;
    }
    function scaleContextOut(contextOut) {
      contextScale.drawImage(contextOut.canvas, 0, 0, w, h);
      return contextScale;
    }
    return module;
  }();

  // src/scripts/engine/audioUtils.js
  function Sound(buffer, context, defaultOutputNode) {
    var source, defaultOutputNode = defaultOutputNode || context.destination, gain = context.createGain(), playbackRate = 1;
    this.setPlaybackRate = function(value) {
      playbackRate = value;
    };
    this.setGain = function(value) {
      if (0 <= value && value <= 1) {
        gain.gain.value = value;
      }
    };
    this.play = function(outputNode, loop, onEnded) {
      outputNode = outputNode || defaultOutputNode;
      loop = loop || false;
      source = context.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = playbackRate;
      if (loop) {
        source.loop = true;
      }
      source.connect(gain);
      gain.connect(outputNode);
      if (onEnded) {
        source.onended = onEnded;
      }
      source.start();
    };
    this.stop = function() {
      source?.stop();
    };
  }
  function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }
  BufferLoader.prototype.loadBuffer = function(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;
    request.onload = function() {
      loader.context.decodeAudioData(request.response, function(buffer) {
        if (!buffer) {
          alert("error decoding file data: " + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length) {
          loader.onload(loader.bufferList);
        }
      }, function(error) {
        console.error("decodeAudioData error", error);
      });
    };
    request.onerror = function() {
      alert("BufferLoader: XHR error");
    };
    request.send();
  };
  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  };

  // src/scripts/engine/music.js
  var music = function() {
    var module = {}, masterGain, context, musicLoop, gain = 1;
    module.load = function(initialVolume) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      if (window.AudioContext) {
        context = new AudioContext();
        masterGain = context.createGain();
        masterGain.connect(context.destination);
      }
      var bufferLoader = new BufferLoader(context, ["assets/audio/music-loop-01.ogg"], finishedLoading);
      gain = initialVolume;
      bufferLoader.load();
    };
    function finishedLoading(bufferList) {
      musicLoop = new Sound(bufferList[0], context, masterGain);
      musicLoop.setGain(gain);
    }
    module.play = function() {
      if (typeof musicLoop !== "undefined") {
        musicLoop.play(null, true);
      }
    };
    module.setVolume = function(val) {
      if (0 <= val && val <= 1) {
        gain = val;
        musicLoop.setGain(gain);
      }
    };
    module.fadeOut = function() {
      fadeOut();
    };
    function fadeOut() {
      var decrement = 0.05;
      if (decrement <= gain) {
        gain -= decrement;
        module.setVolume(gain);
        setTimeout(fadeOut, 700);
      } else {
        musicLoop.stop();
      }
    }
    return module;
  }();

  // src/scripts/engine/outputEffect.js
  var outputEffect = function() {
    var module = {}, contextOut, alpha = 0, activity = 0, w, h, ACTIVITY_THRESHOLD = 100;
    module.init = function(outputCanvas, width, height) {
      w = width;
      h = height;
      contextOut = outputCanvas.getContext("2d");
    };
    module.drawOverlay = function(motionData) {
      var intensity = 0;
      motionData.forEach(function(motionValue) {
        if (intensity < motionValue) {
          intensity = motionValue;
        }
      });
      if (90 < intensity) {
        activity += ACTIVITY_THRESHOLD;
      } else if (70 < intensity) {
        activity += intensity;
      }
      if (ACTIVITY_THRESHOLD < activity) {
        activity -= ACTIVITY_THRESHOLD;
        alpha = 1;
      }
      if (0 < alpha) {
        contextOut.fillStyle = "hsla(0, 100%, 50%, " + alpha + ")";
        contextOut.globalCompositeOperation = "darken";
        contextOut.fillRect(0, 0, w, h);
        contextOut.globalCompositeOperation = "source-over";
      }
      if (0.05 < alpha) {
        alpha -= 0.01;
      } else {
        alpha = 0;
      }
      if (5 < activity) {
        activity -= 10;
      } else {
        activity = 0;
      }
    };
    return module;
  }();

  // src/scripts/engine/sfx.js
  var sfx = function() {
    var module = {}, sounds = {}, masterGain, context, areaWidth = 640, areaHeight = 480;
    module.loadSounds = function() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      if (window.AudioContext) {
        context = new AudioContext();
        masterGain = context.createGain();
        masterGain.connect(context.destination);
      }
      var bufferLoader = new BufferLoader(context, [
        "assets/audio/swoosh-soft-01.ogg",
        "assets/audio/swoosh-soft-02.ogg",
        "assets/audio/swoosh-soft-03.ogg",
        "assets/audio/swoosh-hard-01.ogg",
        "assets/audio/swoosh-hard-02.ogg",
        "assets/audio/swoosh-hard-03.ogg",
        "assets/audio/swoosh-hard-04.ogg",
        "assets/audio/swoosh-hard-05.ogg",
        "assets/audio/swoosh-hard-06.ogg",
        "assets/audio/punch-hard-01.ogg",
        "assets/audio/punch-hard-02.ogg",
        "assets/audio/punch-hard-03.ogg",
        "assets/audio/punch-hard-04.ogg",
        "assets/audio/punch-hard-05.ogg",
        "assets/audio/punch-hard-06.ogg",
        "assets/audio/punch-hard-07.ogg"
      ], finishedLoading);
      bufferLoader.load();
    };
    function finishedLoading(bufferList) {
      sounds.swooshSoft = addSoundsFromBufferList(bufferList, 0, 2);
      sounds.swooshHard = addSoundsFromBufferList(bufferList, 3, 8);
      sounds.punchHard = addSoundsFromBufferList(bufferList, 9, 15);
    }
    function addSoundsFromBufferList(bufferList, start, end) {
      var i, newSound, soundSet = new SoundSet();
      for (i = start; i <= end; i++) {
        newSound = new Sound(bufferList[i], context, masterGain);
        soundSet.addSound(newSound);
      }
      return soundSet;
    }
    module.setAreaDimensions = function(width, height) {
      areaWidth = width;
      areaHeight = height;
    };
    module.setGain = function(value) {
      masterGain.gain.value = value;
    };
    module.generate = function(motionData) {
      var playSwooshHard = {}, playSwooshSoft = {}, playPunch = {};
      motionData.forEach(function(motionValue, i) {
        if (60 < motionValue) {
          playPunch.triggered = true;
          playPunch.volume = motionValue / 100;
          playPunch.pan = regionIndexToPanCoordinates(i);
        }
        if (50 < motionValue) {
          playSwooshHard.triggered = true;
          playSwooshHard.volume = motionValue / 100;
          playSwooshHard.pan = regionIndexToPanCoordinates(i);
        }
        if (30 < motionValue) {
          playSwooshSoft.triggered = true;
          playSwooshSoft.volume = motionValue / 100;
          playSwooshSoft.pan = regionIndexToPanCoordinates(i);
        }
      });
      if (playPunch.triggered) {
        sounds.punchHard?.trigger(playPunch.volume, playPunch.pan.x, playPunch.pan.y);
      } else if (playSwooshHard.triggered) {
        sounds.swooshHard?.trigger(playSwooshHard.volume, playSwooshHard.pan.x, playSwooshHard.pan.y);
      } else if (playSwooshSoft.triggered) {
        sounds.swooshSoft?.trigger(playSwooshSoft.volume, playSwooshSoft.pan.x, playSwooshSoft.pan.y);
      }
    };
    function regionIndexToPanCoordinates(i) {
      var x, y;
      if (i <= 2) {
        y = -1;
      } else if (i <= 5) {
        y = 0;
      } else {
        y = 1;
      }
      if (i % 3 === 0) {
        x = -1;
      } else if ((i - 1) % 3 === 0) {
        x = 0;
      } else {
        x = 1;
      }
      return {
        x,
        y
      };
    }
    return module;
  }();
  function SoundSet() {
    var sounds = [], isPlaying = false;
    this.addSound = function(item) {
      sounds.push(item);
    };
    this.trigger = function(volume, x, y) {
      var randomSound;
      if (!isPlaying) {
        randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        randomSound.setGain(volume);
        randomSound.play(null, null, soundEnded);
        isPlaying = true;
      }
    };
    function soundEnded() {
      isPlaying = false;
    }
  }

  // src/scripts/engine/engine.js
  var hgEngine = function() {
    var module = {}, isStreaming = false, video, canvasOut, contextOut, w, h, showDebugCanvas = false;
    module.browserSupportCheck = function() {
      if (!window.AudioContext && !window.webkitAudioContext) {
        return false;
      }
      if (!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)) {
        return false;
      }
      return true;
    };
    module.init = function(outputElement, width, height, onPlayCallback) {
      w = width;
      h = height;
      canvasOut = outputElement;
      contextOut = canvasOut.getContext("2d");
      motionDetector.init();
      outputEffect.init(canvasOut, w, h);
      sfx.setGain(3);
      createVideoElement();
      startCapturing(onPlayCallback);
    };
    module.fadeOutMusic = function() {
      music.fadeOut();
    };
    module.showDebugCanvas = function(val) {
      if (typeof val !== "undefined") {
        showDebugCanvas = !!val;
      } else {
        return showDebugCanvas;
      }
    };
    module.setSensitivity = function(val) {
      var inverseVal = 100 - val;
      motionDetector.setSensitivity(inverseVal);
    };
    function createVideoElement() {
      var videoElement = document.createElement("video");
      videoElement.setAttribute("id", "video");
      videoElement.setAttribute("width", w);
      videoElement.setAttribute("height", h);
      videoElement.style.display = "none";
      document.body.appendChild(videoElement);
      video = videoElement;
      video.addEventListener("canplay", function() {
        if (!isStreaming) {
          if (video.videoWidth > 0) {
            h = video.videoHeight / (video.videoWidth / w);
          }
          canvasOut.setAttribute("width", w);
          canvasOut.setAttribute("height", h);
          contextOut.translate(w, 0);
          contextOut.scale(-1, 1);
          isStreaming = true;
        }
      }, false);
      video.addEventListener("play", function() {
        update();
      }, false);
    }
    function startCapturing(onPlayCallback) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        video.srcObject = stream;
        video.play();
        music.play();
        if (onPlayCallback) {
          onPlayCallback();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    function update() {
      var motionData;
      drawVideo();
      motionData = motionDetector.analyze(contextOut, showDebugCanvas);
      outputEffect.drawOverlay(motionData);
      sfx.generate(motionData);
      requestAnimationFrame(update);
    }
    function drawVideo() {
      try {
        contextOut.drawImage(video, 0, 0, video.width, video.height);
      } catch (e) {
        if (e.name == "NS_ERROR_NOT_AVAILABLE") {
          console.log("video exception caught" + Date.now().toString());
          setTimeout(drawVideo, 10);
        } else {
          throw e;
        }
      }
    }
    return module;
  }();

  // src/scripts/sequencer.js
  var sequencer = function() {
    var module = {}, events = [], startTime;
    module.registerEvent = function(time, fn) {
      events.push({ time, fn });
    };
    module.start = function() {
      requestAnimationFrame(run);
    };
    function run(timestamp) {
      var elapsed, nextEvent;
      if (typeof startTime === "undefined") {
        startTime = timestamp;
      }
      nextEvent = events[0];
      elapsed = timestamp - startTime;
      if (nextEvent.hasOwnProperty("time") && nextEvent.time < elapsed) {
        nextEvent.fn.call(null);
        events.shift();
      }
      if (0 < events.length) {
        requestAnimationFrame(run);
      }
    }
    return module;
  }();

  // src/scripts/main.js
  readTitles();
  document.querySelector(".start").addEventListener("click", function(e) {
    e.preventDefault();
    if (hgEngine.browserSupportCheck()) {
      document.querySelector(".splash").classList.add("hidden");
      document.querySelector(".loader").classList.remove("hidden");
      setTimeout(function() {
        document.querySelector(".loader").classList.remove("hidden");
      }, 100);
      setTitles();
      initSequencer();
      sfx.loadSounds();
      music.load(0.5);
      setTimeout(function() {
        startMovie(onMovieStarted);
      }, 3500);
    } else {
      document.querySelector(".splash").classList.remove("hidden");
      document.querySelector(".no-support-warning").classList.remove("hidden");
    }
  });
  document.querySelector(".settings-icon").addEventListener("click", function() {
    document.querySelector(".settings-panel").classList.toggle("hidden");
  });
  document.querySelector(".display-debug").addEventListener("change", function() {
    hgEngine.showDebugCanvas(document.querySelector(".display-debug").checked);
  });
  document.querySelector(".sensitivity-slider").addEventListener("change", function() {
    var val = document.querySelector(".sensitivity-slider").value;
    document.querySelector(".sensitivity-label").innerHTML = val;
    hgEngine.setSensitivity(val);
  });
  function onMovieStarted() {
    sequencer.start();
  }
  function readTitles() {
    var titles = decodeTitlesFromHash(), movieName = titles[0] || "Enter The Webcam", actorName = titles[1] || "This Person";
    document.querySelector(".movie-name").innerHTML = movieName;
    document.querySelector(".actor-name").innerHTML = actorName;
  }
  function setTitles() {
    var movieName = document.querySelector(".movie-name").innerHTML, actorName = document.querySelector(".actor-name").innerHTML;
    document.querySelector(".movie-name-title").innerHTML = movieName;
    document.querySelector(".actor-name-title").innerHTML = actorName;
    encodeTitlesToHash(movieName, actorName);
  }
  function encodeTitlesToHash(m, a) {
    var mEncoded = utf8_to_b64(m), aEncoded = utf8_to_b64(a);
    window.location.hash = mEncoded + "|" + aEncoded;
  }
  function decodeTitlesFromHash() {
    var hashParts, mDecoded, aDecoded;
    hashParts = window.location.hash.split("|");
    if (hashParts.length === 2) {
      try {
        mDecoded = b64_to_utf8(hashParts[0].substr(1));
        aDecoded = b64_to_utf8(hashParts[1]);
      } catch (ex) {
        console.log("Could not decode url: " + ex.message);
      }
    }
    return [mDecoded, aDecoded];
  }
  function startMovie(onPlayCallback) {
    var outputCanvas = document.querySelector("#output");
    var maxHeight = window.innerHeight;
    var width = Math.min(window.innerWidth, maxHeight * 4 / 3);
    var height = width * 0.75;
    hgEngine.init(outputCanvas, width, height, onPlayCallback);
  }
  function initSequencer() {
    sequencer.registerEvent(0, function() {
      document.querySelector(".loader").classList.add("hidden");
      document.querySelector("body").classList.add("theater");
      document.querySelector(".output-container").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
      document.querySelector(".settings-panel").classList.remove("hidden");
      document.querySelector(".credits").classList.add("hidden");
    });
    sequencer.registerEvent(1500, function() {
      document.querySelector(".title-hg").classList.remove("hidden");
    });
    sequencer.registerEvent(4e3, function() {
      document.querySelector(".title-hg").classList.add("hidden");
    });
    sequencer.registerEvent(6e3, function() {
      document.querySelector(".title-movie").classList.remove("hidden");
    });
    sequencer.registerEvent(9e3, function() {
      document.querySelector(".title-movie").classList.add("hidden");
    });
    sequencer.registerEvent(11e3, function() {
      document.querySelector(".title-actor").classList.remove("hidden");
    });
    sequencer.registerEvent(12e3, function() {
      document.querySelector(".overlay").classList.add("transparent");
    });
    sequencer.registerEvent(3e4, function() {
      document.querySelector(".overlay").classList.add("hidden");
      hgEngine.fadeOutMusic();
    });
  }
  function utf8_to_b64(str) {
    return window.btoa(encodeURIComponent(escape(str)));
  }
  function b64_to_utf8(str) {
    return unescape(decodeURIComponent(window.atob(str)));
  }
})();
