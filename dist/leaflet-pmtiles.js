var pmtiles = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/@mapbox/point-geometry/index.js
  var require_point_geometry = __commonJS({
    "node_modules/@mapbox/point-geometry/index.js"(exports, module) {
      "use strict";
      module.exports = Point9;
      function Point9(x2, y) {
        this.x = x2;
        this.y = y;
      }
      Point9.prototype = {
        clone: function() {
          return new Point9(this.x, this.y);
        },
        add: function(p) {
          return this.clone()._add(p);
        },
        sub: function(p) {
          return this.clone()._sub(p);
        },
        multByPoint: function(p) {
          return this.clone()._multByPoint(p);
        },
        divByPoint: function(p) {
          return this.clone()._divByPoint(p);
        },
        mult: function(k) {
          return this.clone()._mult(k);
        },
        div: function(k) {
          return this.clone()._div(k);
        },
        rotate: function(a) {
          return this.clone()._rotate(a);
        },
        rotateAround: function(a, p) {
          return this.clone()._rotateAround(a, p);
        },
        matMult: function(m) {
          return this.clone()._matMult(m);
        },
        unit: function() {
          return this.clone()._unit();
        },
        perp: function() {
          return this.clone()._perp();
        },
        round: function() {
          return this.clone()._round();
        },
        mag: function() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        equals: function(other) {
          return this.x === other.x && this.y === other.y;
        },
        dist: function(p) {
          return Math.sqrt(this.distSqr(p));
        },
        distSqr: function(p) {
          var dx = p.x - this.x, dy = p.y - this.y;
          return dx * dx + dy * dy;
        },
        angle: function() {
          return Math.atan2(this.y, this.x);
        },
        angleTo: function(b) {
          return Math.atan2(this.y - b.y, this.x - b.x);
        },
        angleWith: function(b) {
          return this.angleWithSep(b.x, b.y);
        },
        angleWithSep: function(x2, y) {
          return Math.atan2(
            this.x * y - this.y * x2,
            this.x * x2 + this.y * y
          );
        },
        _matMult: function(m) {
          var x2 = m[0] * this.x + m[1] * this.y, y = m[2] * this.x + m[3] * this.y;
          this.x = x2;
          this.y = y;
          return this;
        },
        _add: function(p) {
          this.x += p.x;
          this.y += p.y;
          return this;
        },
        _sub: function(p) {
          this.x -= p.x;
          this.y -= p.y;
          return this;
        },
        _mult: function(k) {
          this.x *= k;
          this.y *= k;
          return this;
        },
        _div: function(k) {
          this.x /= k;
          this.y /= k;
          return this;
        },
        _multByPoint: function(p) {
          this.x *= p.x;
          this.y *= p.y;
          return this;
        },
        _divByPoint: function(p) {
          this.x /= p.x;
          this.y /= p.y;
          return this;
        },
        _unit: function() {
          this._div(this.mag());
          return this;
        },
        _perp: function() {
          var y = this.y;
          this.y = this.x;
          this.x = -y;
          return this;
        },
        _rotate: function(angle) {
          var cos = Math.cos(angle), sin = Math.sin(angle), x2 = cos * this.x - sin * this.y, y = sin * this.x + cos * this.y;
          this.x = x2;
          this.y = y;
          return this;
        },
        _rotateAround: function(angle, p) {
          var cos = Math.cos(angle), sin = Math.sin(angle), x2 = p.x + cos * (this.x - p.x) - sin * (this.y - p.y), y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
          this.x = x2;
          this.y = y;
          return this;
        },
        _round: function() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        }
      };
      Point9.convert = function(a) {
        if (a instanceof Point9) {
          return a;
        }
        if (Array.isArray(a)) {
          return new Point9(a[0], a[1]);
        }
        return a;
      };
    }
  });

  // node_modules/@mapbox/vector-tile/lib/vectortilefeature.js
  var require_vectortilefeature = __commonJS({
    "node_modules/@mapbox/vector-tile/lib/vectortilefeature.js"(exports, module) {
      "use strict";
      var Point9 = require_point_geometry();
      module.exports = VectorTileFeature;
      function VectorTileFeature(pbf, end, extent, keys, values) {
        this.properties = {};
        this.extent = extent;
        this.type = 0;
        this._pbf = pbf;
        this._geometry = -1;
        this._keys = keys;
        this._values = values;
        pbf.readFields(readFeature, this, end);
      }
      function readFeature(tag, feature, pbf) {
        if (tag == 1)
          feature.id = pbf.readVarint();
        else if (tag == 2)
          readTag(pbf, feature);
        else if (tag == 3)
          feature.type = pbf.readVarint();
        else if (tag == 4)
          feature._geometry = pbf.pos;
      }
      function readTag(pbf, feature) {
        var end = pbf.readVarint() + pbf.pos;
        while (pbf.pos < end) {
          var key = feature._keys[pbf.readVarint()], value = feature._values[pbf.readVarint()];
          feature.properties[key] = value;
        }
      }
      VectorTileFeature.types = ["Unknown", "Point", "LineString", "Polygon"];
      VectorTileFeature.prototype.loadGeometry = function() {
        var pbf = this._pbf;
        pbf.pos = this._geometry;
        var end = pbf.readVarint() + pbf.pos, cmd = 1, length = 0, x2 = 0, y = 0, lines = [], line;
        while (pbf.pos < end) {
          if (length <= 0) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 7;
            length = cmdLen >> 3;
          }
          length--;
          if (cmd === 1 || cmd === 2) {
            x2 += pbf.readSVarint();
            y += pbf.readSVarint();
            if (cmd === 1) {
              if (line)
                lines.push(line);
              line = [];
            }
            line.push(new Point9(x2, y));
          } else if (cmd === 7) {
            if (line) {
              line.push(line[0].clone());
            }
          } else {
            throw new Error("unknown command " + cmd);
          }
        }
        if (line)
          lines.push(line);
        return lines;
      };
      VectorTileFeature.prototype.bbox = function() {
        var pbf = this._pbf;
        pbf.pos = this._geometry;
        var end = pbf.readVarint() + pbf.pos, cmd = 1, length = 0, x2 = 0, y = 0, x1 = Infinity, x22 = -Infinity, y1 = Infinity, y2 = -Infinity;
        while (pbf.pos < end) {
          if (length <= 0) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 7;
            length = cmdLen >> 3;
          }
          length--;
          if (cmd === 1 || cmd === 2) {
            x2 += pbf.readSVarint();
            y += pbf.readSVarint();
            if (x2 < x1)
              x1 = x2;
            if (x2 > x22)
              x22 = x2;
            if (y < y1)
              y1 = y;
            if (y > y2)
              y2 = y;
          } else if (cmd !== 7) {
            throw new Error("unknown command " + cmd);
          }
        }
        return [x1, y1, x22, y2];
      };
      VectorTileFeature.prototype.toGeoJSON = function(x2, y, z) {
        var size = this.extent * Math.pow(2, z), x0 = this.extent * x2, y0 = this.extent * y, coords = this.loadGeometry(), type = VectorTileFeature.types[this.type], i2, j;
        function project(line) {
          for (var j2 = 0; j2 < line.length; j2++) {
            var p = line[j2], y2 = 180 - (p.y + y0) * 360 / size;
            line[j2] = [
              (p.x + x0) * 360 / size - 180,
              360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90
            ];
          }
        }
        switch (this.type) {
          case 1:
            var points = [];
            for (i2 = 0; i2 < coords.length; i2++) {
              points[i2] = coords[i2][0];
            }
            coords = points;
            project(coords);
            break;
          case 2:
            for (i2 = 0; i2 < coords.length; i2++) {
              project(coords[i2]);
            }
            break;
          case 3:
            coords = classifyRings(coords);
            for (i2 = 0; i2 < coords.length; i2++) {
              for (j = 0; j < coords[i2].length; j++) {
                project(coords[i2][j]);
              }
            }
            break;
        }
        if (coords.length === 1) {
          coords = coords[0];
        } else {
          type = "Multi" + type;
        }
        var result = {
          type: "Feature",
          geometry: {
            type,
            coordinates: coords
          },
          properties: this.properties
        };
        if ("id" in this) {
          result.id = this.id;
        }
        return result;
      };
      function classifyRings(rings) {
        var len = rings.length;
        if (len <= 1)
          return [rings];
        var polygons = [], polygon, ccw;
        for (var i2 = 0; i2 < len; i2++) {
          var area = signedArea(rings[i2]);
          if (area === 0)
            continue;
          if (ccw === void 0)
            ccw = area < 0;
          if (ccw === area < 0) {
            if (polygon)
              polygons.push(polygon);
            polygon = [rings[i2]];
          } else {
            polygon.push(rings[i2]);
          }
        }
        if (polygon)
          polygons.push(polygon);
        return polygons;
      }
      function signedArea(ring) {
        var sum = 0;
        for (var i2 = 0, len = ring.length, j = len - 1, p1, p2; i2 < len; j = i2++) {
          p1 = ring[i2];
          p2 = ring[j];
          sum += (p2.x - p1.x) * (p1.y + p2.y);
        }
        return sum;
      }
    }
  });

  // node_modules/@mapbox/vector-tile/lib/vectortilelayer.js
  var require_vectortilelayer = __commonJS({
    "node_modules/@mapbox/vector-tile/lib/vectortilelayer.js"(exports, module) {
      "use strict";
      var VectorTileFeature = require_vectortilefeature();
      module.exports = VectorTileLayer;
      function VectorTileLayer(pbf, end) {
        this.version = 1;
        this.name = null;
        this.extent = 4096;
        this.length = 0;
        this._pbf = pbf;
        this._keys = [];
        this._values = [];
        this._features = [];
        pbf.readFields(readLayer, this, end);
        this.length = this._features.length;
      }
      function readLayer(tag, layer, pbf) {
        if (tag === 15)
          layer.version = pbf.readVarint();
        else if (tag === 1)
          layer.name = pbf.readString();
        else if (tag === 5)
          layer.extent = pbf.readVarint();
        else if (tag === 2)
          layer._features.push(pbf.pos);
        else if (tag === 3)
          layer._keys.push(pbf.readString());
        else if (tag === 4)
          layer._values.push(readValueMessage(pbf));
      }
      function readValueMessage(pbf) {
        var value = null, end = pbf.readVarint() + pbf.pos;
        while (pbf.pos < end) {
          var tag = pbf.readVarint() >> 3;
          value = tag === 1 ? pbf.readString() : tag === 2 ? pbf.readFloat() : tag === 3 ? pbf.readDouble() : tag === 4 ? pbf.readVarint64() : tag === 5 ? pbf.readVarint() : tag === 6 ? pbf.readSVarint() : tag === 7 ? pbf.readBoolean() : null;
        }
        return value;
      }
      VectorTileLayer.prototype.feature = function(i2) {
        if (i2 < 0 || i2 >= this._features.length)
          throw new Error("feature index out of bounds");
        this._pbf.pos = this._features[i2];
        var end = this._pbf.readVarint() + this._pbf.pos;
        return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values);
      };
    }
  });

  // node_modules/@mapbox/vector-tile/lib/vectortile.js
  var require_vectortile = __commonJS({
    "node_modules/@mapbox/vector-tile/lib/vectortile.js"(exports, module) {
      "use strict";
      var VectorTileLayer = require_vectortilelayer();
      module.exports = VectorTile2;
      function VectorTile2(pbf, end) {
        this.layers = pbf.readFields(readTile, {}, end);
      }
      function readTile(tag, layers, pbf) {
        if (tag === 3) {
          var layer = new VectorTileLayer(pbf, pbf.readVarint() + pbf.pos);
          if (layer.length)
            layers[layer.name] = layer;
        }
      }
    }
  });

  // node_modules/@mapbox/vector-tile/index.js
  var require_vector_tile = __commonJS({
    "node_modules/@mapbox/vector-tile/index.js"(exports, module) {
      module.exports.VectorTile = require_vectortile();
      module.exports.VectorTileFeature = require_vectortilefeature();
      module.exports.VectorTileLayer = require_vectortilelayer();
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i2 = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i2];
        i2 += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i2 = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i2 - d] |= s * 128;
      };
    }
  });

  // node_modules/pbf/index.js
  var require_pbf = __commonJS({
    "node_modules/pbf/index.js"(exports, module) {
      "use strict";
      module.exports = Pbf;
      var ieee754 = require_ieee754();
      function Pbf(buf) {
        this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
        this.pos = 0;
        this.type = 0;
        this.length = this.buf.length;
      }
      Pbf.Varint = 0;
      Pbf.Fixed64 = 1;
      Pbf.Bytes = 2;
      Pbf.Fixed32 = 5;
      var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
      var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
      var TEXT_DECODER_MIN_LENGTH = 12;
      var utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf8");
      Pbf.prototype = {
        destroy: function() {
          this.buf = null;
        },
        readFields: function(readField, result, end) {
          end = end || this.length;
          while (this.pos < end) {
            var val = this.readVarint(), tag = val >> 3, startPos = this.pos;
            this.type = val & 7;
            readField(tag, result, this);
            if (this.pos === startPos)
              this.skip(val);
          }
          return result;
        },
        readMessage: function(readField, result) {
          return this.readFields(readField, result, this.readVarint() + this.pos);
        },
        readFixed32: function() {
          var val = readUInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        readSFixed32: function() {
          var val = readInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        readFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readSFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readFloat: function() {
          var val = ieee754.read(this.buf, this.pos, true, 23, 4);
          this.pos += 4;
          return val;
        },
        readDouble: function() {
          var val = ieee754.read(this.buf, this.pos, true, 52, 8);
          this.pos += 8;
          return val;
        },
        readVarint: function(isSigned) {
          var buf = this.buf, val, b;
          b = buf[this.pos++];
          val = b & 127;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 7;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 14;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 21;
          if (b < 128)
            return val;
          b = buf[this.pos];
          val |= (b & 15) << 28;
          return readVarintRemainder(val, isSigned, this);
        },
        readVarint64: function() {
          return this.readVarint(true);
        },
        readSVarint: function() {
          var num = this.readVarint();
          return num % 2 === 1 ? (num + 1) / -2 : num / 2;
        },
        readBoolean: function() {
          return Boolean(this.readVarint());
        },
        readString: function() {
          var end = this.readVarint() + this.pos;
          var pos = this.pos;
          this.pos = end;
          if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) {
            return readUtf8TextDecoder(this.buf, pos, end);
          }
          return readUtf8(this.buf, pos, end);
        },
        readBytes: function() {
          var end = this.readVarint() + this.pos, buffer = this.buf.subarray(this.pos, end);
          this.pos = end;
          return buffer;
        },
        readPackedVarint: function(arr, isSigned) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readVarint(isSigned));
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readVarint(isSigned));
          return arr;
        },
        readPackedSVarint: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readSVarint());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSVarint());
          return arr;
        },
        readPackedBoolean: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readBoolean());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readBoolean());
          return arr;
        },
        readPackedFloat: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readFloat());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFloat());
          return arr;
        },
        readPackedDouble: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readDouble());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readDouble());
          return arr;
        },
        readPackedFixed32: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFixed32());
          return arr;
        },
        readPackedSFixed32: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readSFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSFixed32());
          return arr;
        },
        readPackedFixed64: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFixed64());
          return arr;
        },
        readPackedSFixed64: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readSFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSFixed64());
          return arr;
        },
        skip: function(val) {
          var type = val & 7;
          if (type === Pbf.Varint)
            while (this.buf[this.pos++] > 127) {
            }
          else if (type === Pbf.Bytes)
            this.pos = this.readVarint() + this.pos;
          else if (type === Pbf.Fixed32)
            this.pos += 4;
          else if (type === Pbf.Fixed64)
            this.pos += 8;
          else
            throw new Error("Unimplemented type: " + type);
        },
        writeTag: function(tag, type) {
          this.writeVarint(tag << 3 | type);
        },
        realloc: function(min) {
          var length = this.length || 16;
          while (length < this.pos + min)
            length *= 2;
          if (length !== this.length) {
            var buf = new Uint8Array(length);
            buf.set(this.buf);
            this.buf = buf;
            this.length = length;
          }
        },
        finish: function() {
          this.length = this.pos;
          this.pos = 0;
          return this.buf.subarray(0, this.length);
        },
        writeFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeSFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeSFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeVarint: function(val) {
          val = +val || 0;
          if (val > 268435455 || val < 0) {
            writeBigVarint(val, this);
            return;
          }
          this.realloc(4);
          this.buf[this.pos++] = val & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = val >>> 7 & 127;
        },
        writeSVarint: function(val) {
          this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
        },
        writeBoolean: function(val) {
          this.writeVarint(Boolean(val));
        },
        writeString: function(str) {
          str = String(str);
          this.realloc(str.length * 4);
          this.pos++;
          var startPos = this.pos;
          this.pos = writeUtf8(this.buf, str, this.pos);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeFloat: function(val) {
          this.realloc(4);
          ieee754.write(this.buf, val, this.pos, true, 23, 4);
          this.pos += 4;
        },
        writeDouble: function(val) {
          this.realloc(8);
          ieee754.write(this.buf, val, this.pos, true, 52, 8);
          this.pos += 8;
        },
        writeBytes: function(buffer) {
          var len = buffer.length;
          this.writeVarint(len);
          this.realloc(len);
          for (var i2 = 0; i2 < len; i2++)
            this.buf[this.pos++] = buffer[i2];
        },
        writeRawMessage: function(fn, obj) {
          this.pos++;
          var startPos = this.pos;
          fn(obj, this);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeMessage: function(tag, fn, obj) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeRawMessage(fn, obj);
        },
        writePackedVarint: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedVarint, arr);
        },
        writePackedSVarint: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSVarint, arr);
        },
        writePackedBoolean: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedBoolean, arr);
        },
        writePackedFloat: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFloat, arr);
        },
        writePackedDouble: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedDouble, arr);
        },
        writePackedFixed32: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFixed32, arr);
        },
        writePackedSFixed32: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSFixed32, arr);
        },
        writePackedFixed64: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFixed64, arr);
        },
        writePackedSFixed64: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSFixed64, arr);
        },
        writeBytesField: function(tag, buffer) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeBytes(buffer);
        },
        writeFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFixed32(val);
        },
        writeSFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeSFixed32(val);
        },
        writeFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeFixed64(val);
        },
        writeSFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeSFixed64(val);
        },
        writeVarintField: function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeVarint(val);
        },
        writeSVarintField: function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeSVarint(val);
        },
        writeStringField: function(tag, str) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeString(str);
        },
        writeFloatField: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFloat(val);
        },
        writeDoubleField: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeDouble(val);
        },
        writeBooleanField: function(tag, val) {
          this.writeVarintField(tag, Boolean(val));
        }
      };
      function readVarintRemainder(l, s, p) {
        var buf = p.buf, h, b;
        b = buf[p.pos++];
        h = (b & 112) >> 4;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 3;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 10;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 17;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 24;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 1) << 31;
        if (b < 128)
          return toNum(l, h, s);
        throw new Error("Expected varint not more than 10 bytes");
      }
      function readPackedEnd(pbf) {
        return pbf.type === Pbf.Bytes ? pbf.readVarint() + pbf.pos : pbf.pos + 1;
      }
      function toNum(low, high, isSigned) {
        if (isSigned) {
          return high * 4294967296 + (low >>> 0);
        }
        return (high >>> 0) * 4294967296 + (low >>> 0);
      }
      function writeBigVarint(val, pbf) {
        var low, high;
        if (val >= 0) {
          low = val % 4294967296 | 0;
          high = val / 4294967296 | 0;
        } else {
          low = ~(-val % 4294967296);
          high = ~(-val / 4294967296);
          if (low ^ 4294967295) {
            low = low + 1 | 0;
          } else {
            low = 0;
            high = high + 1 | 0;
          }
        }
        if (val >= 18446744073709552e3 || val < -18446744073709552e3) {
          throw new Error("Given varint doesn't fit into 10 bytes");
        }
        pbf.realloc(10);
        writeBigVarintLow(low, high, pbf);
        writeBigVarintHigh(high, pbf);
      }
      function writeBigVarintLow(low, high, pbf) {
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos] = low & 127;
      }
      function writeBigVarintHigh(high, pbf) {
        var lsb = (high & 7) << 4;
        pbf.buf[pbf.pos++] |= lsb | ((high >>>= 3) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127;
      }
      function makeRoomForExtraLength(startPos, len, pbf) {
        var extraLen = len <= 16383 ? 1 : len <= 2097151 ? 2 : len <= 268435455 ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));
        pbf.realloc(extraLen);
        for (var i2 = pbf.pos - 1; i2 >= startPos; i2--)
          pbf.buf[i2 + extraLen] = pbf.buf[i2];
      }
      function writePackedVarint(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeVarint(arr[i2]);
      }
      function writePackedSVarint(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeSVarint(arr[i2]);
      }
      function writePackedFloat(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeFloat(arr[i2]);
      }
      function writePackedDouble(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeDouble(arr[i2]);
      }
      function writePackedBoolean(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeBoolean(arr[i2]);
      }
      function writePackedFixed32(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeFixed32(arr[i2]);
      }
      function writePackedSFixed32(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeSFixed32(arr[i2]);
      }
      function writePackedFixed64(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeFixed64(arr[i2]);
      }
      function writePackedSFixed64(arr, pbf) {
        for (var i2 = 0; i2 < arr.length; i2++)
          pbf.writeSFixed64(arr[i2]);
      }
      function readUInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + buf[pos + 3] * 16777216;
      }
      function writeInt32(buf, val, pos) {
        buf[pos] = val;
        buf[pos + 1] = val >>> 8;
        buf[pos + 2] = val >>> 16;
        buf[pos + 3] = val >>> 24;
      }
      function readInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + (buf[pos + 3] << 24);
      }
      function readUtf8(buf, pos, end) {
        var str = "";
        var i2 = pos;
        while (i2 < end) {
          var b0 = buf[i2];
          var c = null;
          var bytesPerSequence = b0 > 239 ? 4 : b0 > 223 ? 3 : b0 > 191 ? 2 : 1;
          if (i2 + bytesPerSequence > end)
            break;
          var b1, b2, b3;
          if (bytesPerSequence === 1) {
            if (b0 < 128) {
              c = b0;
            }
          } else if (bytesPerSequence === 2) {
            b1 = buf[i2 + 1];
            if ((b1 & 192) === 128) {
              c = (b0 & 31) << 6 | b1 & 63;
              if (c <= 127) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 3) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            if ((b1 & 192) === 128 && (b2 & 192) === 128) {
              c = (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
              if (c <= 2047 || c >= 55296 && c <= 57343) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 4) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            b3 = buf[i2 + 3];
            if ((b1 & 192) === 128 && (b2 & 192) === 128 && (b3 & 192) === 128) {
              c = (b0 & 15) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
              if (c <= 65535 || c >= 1114112) {
                c = null;
              }
            }
          }
          if (c === null) {
            c = 65533;
            bytesPerSequence = 1;
          } else if (c > 65535) {
            c -= 65536;
            str += String.fromCharCode(c >>> 10 & 1023 | 55296);
            c = 56320 | c & 1023;
          }
          str += String.fromCharCode(c);
          i2 += bytesPerSequence;
        }
        return str;
      }
      function readUtf8TextDecoder(buf, pos, end) {
        return utf8TextDecoder.decode(buf.subarray(pos, end));
      }
      function writeUtf8(buf, str, pos) {
        for (var i2 = 0, c, lead; i2 < str.length; i2++) {
          c = str.charCodeAt(i2);
          if (c > 55295 && c < 57344) {
            if (lead) {
              if (c < 56320) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
                lead = c;
                continue;
              } else {
                c = lead - 55296 << 10 | c - 56320 | 65536;
                lead = null;
              }
            } else {
              if (c > 56319 || i2 + 1 === str.length) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
              } else {
                lead = c;
              }
              continue;
            }
          } else if (lead) {
            buf[pos++] = 239;
            buf[pos++] = 191;
            buf[pos++] = 189;
            lead = null;
          }
          if (c < 128) {
            buf[pos++] = c;
          } else {
            if (c < 2048) {
              buf[pos++] = c >> 6 | 192;
            } else {
              if (c < 65536) {
                buf[pos++] = c >> 12 | 224;
              } else {
                buf[pos++] = c >> 18 | 240;
                buf[pos++] = c >> 12 & 63 | 128;
              }
              buf[pos++] = c >> 6 & 63 | 128;
            }
            buf[pos++] = c & 63 | 128;
          }
        }
        return pos;
      }
    }
  });

  // node_modules/rbush/rbush.min.js
  var require_rbush_min = __commonJS({
    "node_modules/rbush/rbush.min.js"(exports, module) {
      !function(t, i2) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = i2() : "function" == typeof define && define.amd ? define(i2) : (t = t || self).RBush = i2();
      }(exports, function() {
        "use strict";
        function t(t2, r2, e2, a2, h2) {
          !function t3(n2, r3, e3, a3, h3) {
            for (; a3 > e3; ) {
              if (a3 - e3 > 600) {
                var o2 = a3 - e3 + 1, s2 = r3 - e3 + 1, l2 = Math.log(o2), f2 = 0.5 * Math.exp(2 * l2 / 3), u2 = 0.5 * Math.sqrt(l2 * f2 * (o2 - f2) / o2) * (s2 - o2 / 2 < 0 ? -1 : 1), m2 = Math.max(e3, Math.floor(r3 - s2 * f2 / o2 + u2)), c2 = Math.min(a3, Math.floor(r3 + (o2 - s2) * f2 / o2 + u2));
                t3(n2, r3, m2, c2, h3);
              }
              var p2 = n2[r3], d2 = e3, x2 = a3;
              for (i2(n2, e3, r3), h3(n2[a3], p2) > 0 && i2(n2, e3, a3); d2 < x2; ) {
                for (i2(n2, d2, x2), d2++, x2--; h3(n2[d2], p2) < 0; )
                  d2++;
                for (; h3(n2[x2], p2) > 0; )
                  x2--;
              }
              0 === h3(n2[e3], p2) ? i2(n2, e3, x2) : i2(n2, ++x2, a3), x2 <= r3 && (e3 = x2 + 1), r3 <= x2 && (a3 = x2 - 1);
            }
          }(t2, r2, e2 || 0, a2 || t2.length - 1, h2 || n);
        }
        function i2(t2, i3, n2) {
          var r2 = t2[i3];
          t2[i3] = t2[n2], t2[n2] = r2;
        }
        function n(t2, i3) {
          return t2 < i3 ? -1 : t2 > i3 ? 1 : 0;
        }
        var r = function(t2) {
          void 0 === t2 && (t2 = 9), this._maxEntries = Math.max(4, t2), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
        };
        function e(t2, i3, n2) {
          if (!n2)
            return i3.indexOf(t2);
          for (var r2 = 0; r2 < i3.length; r2++)
            if (n2(t2, i3[r2]))
              return r2;
          return -1;
        }
        function a(t2, i3) {
          h(t2, 0, t2.children.length, i3, t2);
        }
        function h(t2, i3, n2, r2, e2) {
          e2 || (e2 = p(null)), e2.minX = 1 / 0, e2.minY = 1 / 0, e2.maxX = -1 / 0, e2.maxY = -1 / 0;
          for (var a2 = i3; a2 < n2; a2++) {
            var h2 = t2.children[a2];
            o(e2, t2.leaf ? r2(h2) : h2);
          }
          return e2;
        }
        function o(t2, i3) {
          return t2.minX = Math.min(t2.minX, i3.minX), t2.minY = Math.min(t2.minY, i3.minY), t2.maxX = Math.max(t2.maxX, i3.maxX), t2.maxY = Math.max(t2.maxY, i3.maxY), t2;
        }
        function s(t2, i3) {
          return t2.minX - i3.minX;
        }
        function l(t2, i3) {
          return t2.minY - i3.minY;
        }
        function f(t2) {
          return (t2.maxX - t2.minX) * (t2.maxY - t2.minY);
        }
        function u(t2) {
          return t2.maxX - t2.minX + (t2.maxY - t2.minY);
        }
        function m(t2, i3) {
          return t2.minX <= i3.minX && t2.minY <= i3.minY && i3.maxX <= t2.maxX && i3.maxY <= t2.maxY;
        }
        function c(t2, i3) {
          return i3.minX <= t2.maxX && i3.minY <= t2.maxY && i3.maxX >= t2.minX && i3.maxY >= t2.minY;
        }
        function p(t2) {
          return { children: t2, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
        }
        function d(i3, n2, r2, e2, a2) {
          for (var h2 = [n2, r2]; h2.length; )
            if (!((r2 = h2.pop()) - (n2 = h2.pop()) <= e2)) {
              var o2 = n2 + Math.ceil((r2 - n2) / e2 / 2) * e2;
              t(i3, o2, n2, r2, a2), h2.push(n2, o2, o2, r2);
            }
        }
        return r.prototype.all = function() {
          return this._all(this.data, []);
        }, r.prototype.search = function(t2) {
          var i3 = this.data, n2 = [];
          if (!c(t2, i3))
            return n2;
          for (var r2 = this.toBBox, e2 = []; i3; ) {
            for (var a2 = 0; a2 < i3.children.length; a2++) {
              var h2 = i3.children[a2], o2 = i3.leaf ? r2(h2) : h2;
              c(t2, o2) && (i3.leaf ? n2.push(h2) : m(t2, o2) ? this._all(h2, n2) : e2.push(h2));
            }
            i3 = e2.pop();
          }
          return n2;
        }, r.prototype.collides = function(t2) {
          var i3 = this.data;
          if (!c(t2, i3))
            return false;
          for (var n2 = []; i3; ) {
            for (var r2 = 0; r2 < i3.children.length; r2++) {
              var e2 = i3.children[r2], a2 = i3.leaf ? this.toBBox(e2) : e2;
              if (c(t2, a2)) {
                if (i3.leaf || m(t2, a2))
                  return true;
                n2.push(e2);
              }
            }
            i3 = n2.pop();
          }
          return false;
        }, r.prototype.load = function(t2) {
          if (!t2 || !t2.length)
            return this;
          if (t2.length < this._minEntries) {
            for (var i3 = 0; i3 < t2.length; i3++)
              this.insert(t2[i3]);
            return this;
          }
          var n2 = this._build(t2.slice(), 0, t2.length - 1, 0);
          if (this.data.children.length)
            if (this.data.height === n2.height)
              this._splitRoot(this.data, n2);
            else {
              if (this.data.height < n2.height) {
                var r2 = this.data;
                this.data = n2, n2 = r2;
              }
              this._insert(n2, this.data.height - n2.height - 1, true);
            }
          else
            this.data = n2;
          return this;
        }, r.prototype.insert = function(t2) {
          return t2 && this._insert(t2, this.data.height - 1), this;
        }, r.prototype.clear = function() {
          return this.data = p([]), this;
        }, r.prototype.remove = function(t2, i3) {
          if (!t2)
            return this;
          for (var n2, r2, a2, h2 = this.data, o2 = this.toBBox(t2), s2 = [], l2 = []; h2 || s2.length; ) {
            if (h2 || (h2 = s2.pop(), r2 = s2[s2.length - 1], n2 = l2.pop(), a2 = true), h2.leaf) {
              var f2 = e(t2, h2.children, i3);
              if (-1 !== f2)
                return h2.children.splice(f2, 1), s2.push(h2), this._condense(s2), this;
            }
            a2 || h2.leaf || !m(h2, o2) ? r2 ? (n2++, h2 = r2.children[n2], a2 = false) : h2 = null : (s2.push(h2), l2.push(n2), n2 = 0, r2 = h2, h2 = h2.children[0]);
          }
          return this;
        }, r.prototype.toBBox = function(t2) {
          return t2;
        }, r.prototype.compareMinX = function(t2, i3) {
          return t2.minX - i3.minX;
        }, r.prototype.compareMinY = function(t2, i3) {
          return t2.minY - i3.minY;
        }, r.prototype.toJSON = function() {
          return this.data;
        }, r.prototype.fromJSON = function(t2) {
          return this.data = t2, this;
        }, r.prototype._all = function(t2, i3) {
          for (var n2 = []; t2; )
            t2.leaf ? i3.push.apply(i3, t2.children) : n2.push.apply(n2, t2.children), t2 = n2.pop();
          return i3;
        }, r.prototype._build = function(t2, i3, n2, r2) {
          var e2, h2 = n2 - i3 + 1, o2 = this._maxEntries;
          if (h2 <= o2)
            return a(e2 = p(t2.slice(i3, n2 + 1)), this.toBBox), e2;
          r2 || (r2 = Math.ceil(Math.log(h2) / Math.log(o2)), o2 = Math.ceil(h2 / Math.pow(o2, r2 - 1))), (e2 = p([])).leaf = false, e2.height = r2;
          var s2 = Math.ceil(h2 / o2), l2 = s2 * Math.ceil(Math.sqrt(o2));
          d(t2, i3, n2, l2, this.compareMinX);
          for (var f2 = i3; f2 <= n2; f2 += l2) {
            var u2 = Math.min(f2 + l2 - 1, n2);
            d(t2, f2, u2, s2, this.compareMinY);
            for (var m2 = f2; m2 <= u2; m2 += s2) {
              var c2 = Math.min(m2 + s2 - 1, u2);
              e2.children.push(this._build(t2, m2, c2, r2 - 1));
            }
          }
          return a(e2, this.toBBox), e2;
        }, r.prototype._chooseSubtree = function(t2, i3, n2, r2) {
          for (; r2.push(i3), !i3.leaf && r2.length - 1 !== n2; ) {
            for (var e2 = 1 / 0, a2 = 1 / 0, h2 = void 0, o2 = 0; o2 < i3.children.length; o2++) {
              var s2 = i3.children[o2], l2 = f(s2), u2 = (m2 = t2, c2 = s2, (Math.max(c2.maxX, m2.maxX) - Math.min(c2.minX, m2.minX)) * (Math.max(c2.maxY, m2.maxY) - Math.min(c2.minY, m2.minY)) - l2);
              u2 < a2 ? (a2 = u2, e2 = l2 < e2 ? l2 : e2, h2 = s2) : u2 === a2 && l2 < e2 && (e2 = l2, h2 = s2);
            }
            i3 = h2 || i3.children[0];
          }
          var m2, c2;
          return i3;
        }, r.prototype._insert = function(t2, i3, n2) {
          var r2 = n2 ? t2 : this.toBBox(t2), e2 = [], a2 = this._chooseSubtree(r2, this.data, i3, e2);
          for (a2.children.push(t2), o(a2, r2); i3 >= 0 && e2[i3].children.length > this._maxEntries; )
            this._split(e2, i3), i3--;
          this._adjustParentBBoxes(r2, e2, i3);
        }, r.prototype._split = function(t2, i3) {
          var n2 = t2[i3], r2 = n2.children.length, e2 = this._minEntries;
          this._chooseSplitAxis(n2, e2, r2);
          var h2 = this._chooseSplitIndex(n2, e2, r2), o2 = p(n2.children.splice(h2, n2.children.length - h2));
          o2.height = n2.height, o2.leaf = n2.leaf, a(n2, this.toBBox), a(o2, this.toBBox), i3 ? t2[i3 - 1].children.push(o2) : this._splitRoot(n2, o2);
        }, r.prototype._splitRoot = function(t2, i3) {
          this.data = p([t2, i3]), this.data.height = t2.height + 1, this.data.leaf = false, a(this.data, this.toBBox);
        }, r.prototype._chooseSplitIndex = function(t2, i3, n2) {
          for (var r2, e2, a2, o2, s2, l2, u2, m2 = 1 / 0, c2 = 1 / 0, p2 = i3; p2 <= n2 - i3; p2++) {
            var d2 = h(t2, 0, p2, this.toBBox), x2 = h(t2, p2, n2, this.toBBox), v = (e2 = d2, a2 = x2, o2 = void 0, s2 = void 0, l2 = void 0, u2 = void 0, o2 = Math.max(e2.minX, a2.minX), s2 = Math.max(e2.minY, a2.minY), l2 = Math.min(e2.maxX, a2.maxX), u2 = Math.min(e2.maxY, a2.maxY), Math.max(0, l2 - o2) * Math.max(0, u2 - s2)), M = f(d2) + f(x2);
            v < m2 ? (m2 = v, r2 = p2, c2 = M < c2 ? M : c2) : v === m2 && M < c2 && (c2 = M, r2 = p2);
          }
          return r2 || n2 - i3;
        }, r.prototype._chooseSplitAxis = function(t2, i3, n2) {
          var r2 = t2.leaf ? this.compareMinX : s, e2 = t2.leaf ? this.compareMinY : l;
          this._allDistMargin(t2, i3, n2, r2) < this._allDistMargin(t2, i3, n2, e2) && t2.children.sort(r2);
        }, r.prototype._allDistMargin = function(t2, i3, n2, r2) {
          t2.children.sort(r2);
          for (var e2 = this.toBBox, a2 = h(t2, 0, i3, e2), s2 = h(t2, n2 - i3, n2, e2), l2 = u(a2) + u(s2), f2 = i3; f2 < n2 - i3; f2++) {
            var m2 = t2.children[f2];
            o(a2, t2.leaf ? e2(m2) : m2), l2 += u(a2);
          }
          for (var c2 = n2 - i3 - 1; c2 >= i3; c2--) {
            var p2 = t2.children[c2];
            o(s2, t2.leaf ? e2(p2) : p2), l2 += u(s2);
          }
          return l2;
        }, r.prototype._adjustParentBBoxes = function(t2, i3, n2) {
          for (var r2 = n2; r2 >= 0; r2--)
            o(i3[r2], t2);
        }, r.prototype._condense = function(t2) {
          for (var i3 = t2.length - 1, n2 = void 0; i3 >= 0; i3--)
            0 === t2[i3].children.length ? i3 > 0 ? (n2 = t2[i3 - 1].children).splice(n2.indexOf(t2[i3]), 1) : this.clear() : a(t2[i3], this.toBBox);
        }, r;
      });
    }
  });

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    filterFn: () => filterFn,
    getFont: () => getFont,
    mapbox_style: () => mapbox_style,
    numberFn: () => numberFn,
    numberOrFn: () => numberOrFn,
    widthFn: () => widthFn
  });

  // node_modules/protomaps-leaflet/dist/frontends/static.js
  var import_point_geometry7 = __toESM(require_point_geometry(), 1);

  // node_modules/protomaps-leaflet/dist/symbolizer.js
  var import_point_geometry3 = __toESM(require_point_geometry(), 1);

  // node_modules/protomaps-leaflet/dist/attribute.js
  var StringAttr = class {
    constructor(c, defaultValue) {
      this.str = c !== null && c !== void 0 ? c : defaultValue;
      this.perFeature = typeof this.str === "function" && this.str.length === 2;
    }
    get(z, f) {
      if (typeof this.str === "function") {
        return this.str(z, f);
      }
      return this.str;
    }
  };
  var NumberAttr = class {
    constructor(c, defaultValue = 1) {
      this.value = c !== null && c !== void 0 ? c : defaultValue;
      this.perFeature = typeof this.value === "function" && this.value.length === 2;
    }
    get(z, f) {
      if (typeof this.value === "function") {
        return this.value(z, f);
      }
      return this.value;
    }
  };
  var TextAttr = class {
    constructor(options) {
      var _a2;
      this.labelProps = (_a2 = options === null || options === void 0 ? void 0 : options.labelProps) !== null && _a2 !== void 0 ? _a2 : ["name"];
      this.textTransform = options === null || options === void 0 ? void 0 : options.textTransform;
    }
    get(z, f) {
      let retval;
      let labelProps;
      if (typeof this.labelProps === "function") {
        labelProps = this.labelProps(z, f);
      } else {
        labelProps = this.labelProps;
      }
      for (const property of labelProps) {
        if (Object.prototype.hasOwnProperty.call(f.props, property) && typeof f.props[property] === "string") {
          retval = f.props[property];
          break;
        }
      }
      let transform;
      if (typeof this.textTransform === "function") {
        transform = this.textTransform(z, f);
      } else {
        transform = this.textTransform;
      }
      if (retval && transform === "uppercase")
        retval = retval.toUpperCase();
      else if (retval && transform === "lowercase")
        retval = retval.toLowerCase();
      else if (retval && transform === "capitalize") {
        const wordsArray = retval.toLowerCase().split(" ");
        const capsArray = wordsArray.map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        });
        retval = capsArray.join(" ");
      }
      return retval;
    }
  };
  var FontAttr = class {
    constructor(options) {
      var _a2, _b2;
      if (options === null || options === void 0 ? void 0 : options.font) {
        this.font = options.font;
      } else {
        this.family = (_a2 = options === null || options === void 0 ? void 0 : options.fontFamily) !== null && _a2 !== void 0 ? _a2 : "sans-serif";
        this.size = (_b2 = options === null || options === void 0 ? void 0 : options.fontSize) !== null && _b2 !== void 0 ? _b2 : 12;
        this.weight = options === null || options === void 0 ? void 0 : options.fontWeight;
        this.style = options === null || options === void 0 ? void 0 : options.fontStyle;
      }
    }
    get(z, f) {
      if (this.font) {
        if (typeof this.font === "function") {
          return this.font(z, f);
        }
        return this.font;
      }
      let style = "";
      if (this.style) {
        if (typeof this.style === "function") {
          style = `${this.style(z, f)} `;
        } else {
          style = `${this.style} `;
        }
      }
      let weight = "";
      if (this.weight) {
        if (typeof this.weight === "function") {
          weight = `${this.weight(z, f)} `;
        } else {
          weight = `${this.weight} `;
        }
      }
      let size;
      if (typeof this.size === "function") {
        size = this.size(z, f);
      } else {
        size = this.size;
      }
      let family;
      if (typeof this.family === "function") {
        family = this.family(z, f);
      } else {
        family = this.family;
      }
      return `${style}${weight}${size}px ${family}`;
    }
  };
  var ArrayAttr = class {
    constructor(c, defaultValue = []) {
      this.value = c !== null && c !== void 0 ? c : defaultValue;
      this.perFeature = typeof this.value === "function" && this.value.length === 2;
    }
    get(z, f) {
      if (typeof this.value === "function") {
        return this.value(z, f);
      }
      return this.value;
    }
  };

  // node_modules/protomaps-leaflet/dist/line.js
  var import_point_geometry = __toESM(require_point_geometry(), 1);
  var linelabel = (pts, maxAngleDelta, targetLen) => {
    const chunks = [];
    let a;
    let b;
    let c;
    let i2 = 0;
    let n = 0;
    let d = 0;
    let abmag = 0;
    let bcmag = 0;
    let abx = 0;
    let aby = 0;
    let bcx = 0;
    let bcy = 0;
    let dt = 0;
    let iStart = 0;
    let dStart = 0;
    if (pts.length < 2)
      return [];
    if (pts.length === 2) {
      d = Math.sqrt(Math.pow(pts[1].x - pts[0].x, 2) + Math.pow(pts[1].y - pts[0].y, 2));
      return [
        {
          length: d,
          beginIndex: 0,
          beginDistance: 0,
          endIndex: 2,
          endDistance: d
        }
      ];
    }
    abmag = Math.sqrt(Math.pow(pts[1].x - pts[0].x, 2) + Math.pow(pts[1].y - pts[0].y, 2));
    for (i2 = 1, n = pts.length - 1; i2 < n; i2++) {
      a = pts[i2 - 1];
      b = pts[i2];
      c = pts[i2 + 1];
      abx = b.x - a.x;
      aby = b.y - a.y;
      bcx = c.x - b.x;
      bcy = c.y - b.y;
      bcmag = Math.sqrt(bcx * bcx + bcy * bcy);
      d += abmag;
      dt = Math.acos((abx * bcx + aby * bcy) / (abmag * bcmag));
      if (dt > maxAngleDelta || d - dStart > targetLen) {
        chunks.push({
          length: d - dStart,
          beginDistance: dStart,
          beginIndex: iStart,
          endIndex: i2 + 1,
          endDistance: d
        });
        iStart = i2;
        dStart = d;
      }
      abmag = bcmag;
    }
    if (i2 - iStart > 0) {
      chunks.push({
        length: d - dStart + bcmag,
        beginIndex: iStart,
        beginDistance: dStart,
        endIndex: i2 + 1,
        endDistance: d + bcmag
      });
    }
    return chunks;
  };
  function simpleLabel(mls, minimum, repeatDistance, cellSize) {
    const candidates = [];
    for (const ls of mls) {
      const segments = linelabel(ls, Math.PI / 45, minimum);
      for (const segment of segments) {
        if (segment.length >= minimum + cellSize) {
          const start = new import_point_geometry.default(ls[segment.beginIndex].x, ls[segment.beginIndex].y);
          const end = ls[segment.endIndex - 1];
          const normalized = new import_point_geometry.default((end.x - start.x) / segment.length, (end.y - start.y) / segment.length);
          for (let i2 = cellSize; i2 < segment.length - minimum; i2 += repeatDistance) {
            candidates.push({
              start: start.add(normalized.mult(i2)),
              end: start.add(normalized.mult(i2 + minimum))
            });
          }
        }
      }
    }
    return candidates;
  }
  function lineCells(a, b, length, spacing) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const retval = [];
    for (let i2 = 0; i2 < length + spacing; i2 += 2 * spacing) {
      const factor = i2 * 1 / dist;
      retval.push({ x: a.x + factor * dx, y: a.y + factor * dy });
    }
    return retval;
  }

  // node_modules/protomaps-leaflet/dist/text.js
  function linebreak(str, maxUnits) {
    if (str.length <= maxUnits)
      return [str];
    const endIndex = maxUnits - 1;
    const spaceBefore = str.lastIndexOf(" ", endIndex);
    const spaceAfter = str.indexOf(" ", endIndex);
    if (spaceBefore === -1 && spaceAfter === -1) {
      return [str];
    }
    let first;
    let after;
    if (spaceAfter === -1 || spaceBefore >= 0 && endIndex - spaceBefore < spaceAfter - endIndex) {
      first = str.substring(0, spaceBefore);
      after = str.substring(spaceBefore + 1, str.length);
    } else {
      first = str.substring(0, spaceAfter);
      after = str.substring(spaceAfter + 1, str.length);
    }
    return [first, ...linebreak(after, maxUnits)];
  }
  var CJK_CHARS = "\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DB5\u4E00-\u9FEA\uF900-\uFA6D\uFA70-\uFAD9\u2000";
  var cjkTest = new RegExp(`^[${CJK_CHARS}]+$`);

  // node_modules/protomaps-leaflet/dist/tilecache.js
  var import_point_geometry2 = __toESM(require_point_geometry(), 1);
  var import_vector_tile = __toESM(require_vector_tile(), 1);
  var import_pbf = __toESM(require_pbf(), 1);

  // node_modules/pmtiles/dist/index.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    0,
    0,
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var et = /* @__PURE__ */ new u8(0);
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }

  // node_modules/protomaps-leaflet/dist/tilecache.js
  var GeomType;
  (function(GeomType2) {
    GeomType2[GeomType2["Point"] = 1] = "Point";
    GeomType2[GeomType2["Line"] = 2] = "Line";
    GeomType2[GeomType2["Polygon"] = 3] = "Polygon";
  })(GeomType || (GeomType = {}));
  var R = 6378137;
  var MAXCOORD = R * Math.PI;

  // node_modules/protomaps-leaflet/dist/symbolizer.js
  var Justify;
  (function(Justify2) {
    Justify2[Justify2["Left"] = 1] = "Left";
    Justify2[Justify2["Center"] = 2] = "Center";
    Justify2[Justify2["Right"] = 3] = "Right";
  })(Justify || (Justify = {}));
  var TextPlacements;
  (function(TextPlacements2) {
    TextPlacements2[TextPlacements2["N"] = 1] = "N";
    TextPlacements2[TextPlacements2["Ne"] = 2] = "Ne";
    TextPlacements2[TextPlacements2["E"] = 3] = "E";
    TextPlacements2[TextPlacements2["Se"] = 4] = "Se";
    TextPlacements2[TextPlacements2["S"] = 5] = "S";
    TextPlacements2[TextPlacements2["Sw"] = 6] = "Sw";
    TextPlacements2[TextPlacements2["W"] = 7] = "W";
    TextPlacements2[TextPlacements2["Nw"] = 8] = "Nw";
  })(TextPlacements || (TextPlacements = {}));
  var PolygonSymbolizer = class {
    constructor(options) {
      var _a2;
      this.pattern = options.pattern;
      this.fill = new StringAttr(options.fill, "black");
      this.opacity = new NumberAttr(options.opacity, 1);
      this.stroke = new StringAttr(options.stroke, "black");
      this.width = new NumberAttr(options.width, 0);
      this.perFeature = (_a2 = this.fill.perFeature || this.opacity.perFeature || this.stroke.perFeature || this.width.perFeature || options.perFeature) !== null && _a2 !== void 0 ? _a2 : false;
      this.doStroke = false;
    }
    before(ctx, z) {
      if (!this.perFeature) {
        ctx.globalAlpha = this.opacity.get(z);
        ctx.fillStyle = this.fill.get(z);
        ctx.strokeStyle = this.stroke.get(z);
        const width = this.width.get(z);
        if (width > 0)
          this.doStroke = true;
        ctx.lineWidth = width;
      }
      if (this.pattern) {
        const patten = ctx.createPattern(this.pattern, "repeat");
        if (patten)
          ctx.fillStyle = patten;
      }
    }
    draw(ctx, geom, z, f) {
      let doStroke = false;
      if (this.perFeature) {
        ctx.globalAlpha = this.opacity.get(z, f);
        ctx.fillStyle = this.fill.get(z, f);
        const width = this.width.get(z, f);
        if (width) {
          doStroke = true;
          ctx.strokeStyle = this.stroke.get(z, f);
          ctx.lineWidth = width;
        }
      }
      const drawPath = () => {
        ctx.fill();
        if (doStroke || this.doStroke) {
          ctx.stroke();
        }
      };
      ctx.beginPath();
      for (const poly of geom) {
        for (let p = 0; p < poly.length; p++) {
          const pt = poly[p];
          if (p === 0)
            ctx.moveTo(pt.x, pt.y);
          else
            ctx.lineTo(pt.x, pt.y);
        }
      }
      drawPath();
    }
  };
  function getStopIndex(input, stops) {
    let idx = 0;
    while (stops[idx + 1][0] < input)
      idx++;
    return idx;
  }
  function interpolate(factor, start, end) {
    return factor * (end - start) + start;
  }
  function computeInterpolationFactor(z, idx, base, stops) {
    const difference = stops[idx + 1][0] - stops[idx][0];
    const progress = z - stops[idx][0];
    if (difference === 0)
      return 0;
    if (base === 1)
      return progress / difference;
    return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
  }
  function exp(base, stops) {
    return (z) => {
      if (stops.length < 1)
        return 0;
      if (z <= stops[0][0])
        return stops[0][1];
      if (z >= stops[stops.length - 1][0])
        return stops[stops.length - 1][1];
      const idx = getStopIndex(z, stops);
      const factor = computeInterpolationFactor(z, idx, base, stops);
      return interpolate(factor, stops[idx][1], stops[idx + 1][1]);
    };
  }
  var LineSymbolizer = class {
    constructor(options) {
      var _a2;
      this.color = new StringAttr(options.color, "black");
      this.width = new NumberAttr(options.width);
      this.opacity = new NumberAttr(options.opacity);
      this.dash = options.dash ? new ArrayAttr(options.dash) : null;
      this.dashColor = new StringAttr(options.dashColor, "black");
      this.dashWidth = new NumberAttr(options.dashWidth, 1);
      this.lineCap = new StringAttr(options.lineCap, "butt");
      this.lineJoin = new StringAttr(options.lineJoin, "miter");
      this.skip = false;
      this.perFeature = !!(((_a2 = this.dash) === null || _a2 === void 0 ? void 0 : _a2.perFeature) || this.color.perFeature || this.opacity.perFeature || this.width.perFeature || this.lineCap.perFeature || this.lineJoin.perFeature || options.perFeature);
    }
    before(ctx, z) {
      if (!this.perFeature) {
        ctx.strokeStyle = this.color.get(z);
        ctx.lineWidth = this.width.get(z);
        ctx.globalAlpha = this.opacity.get(z);
        ctx.lineCap = this.lineCap.get(z);
        ctx.lineJoin = this.lineJoin.get(z);
      }
    }
    draw(ctx, geom, z, f) {
      if (this.skip)
        return;
      const strokePath = () => {
        if (this.perFeature) {
          ctx.globalAlpha = this.opacity.get(z, f);
          ctx.lineCap = this.lineCap.get(z, f);
          ctx.lineJoin = this.lineJoin.get(z, f);
        }
        if (this.dash) {
          ctx.save();
          if (this.perFeature) {
            ctx.lineWidth = this.dashWidth.get(z, f);
            ctx.strokeStyle = this.dashColor.get(z, f);
            ctx.setLineDash(this.dash.get(z, f));
          } else {
            ctx.setLineDash(this.dash.get(z));
          }
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.save();
          if (this.perFeature) {
            ctx.lineWidth = this.width.get(z, f);
            ctx.strokeStyle = this.color.get(z, f);
          }
          ctx.stroke();
          ctx.restore();
        }
      };
      ctx.beginPath();
      for (const ls of geom) {
        for (let p = 0; p < ls.length; p++) {
          const pt = ls[p];
          if (p === 0)
            ctx.moveTo(pt.x, pt.y);
          else
            ctx.lineTo(pt.x, pt.y);
        }
      }
      strokePath();
    }
  };
  var CircleSymbolizer = class {
    constructor(options) {
      this.radius = new NumberAttr(options.radius, 3);
      this.fill = new StringAttr(options.fill, "black");
      this.stroke = new StringAttr(options.stroke, "white");
      this.width = new NumberAttr(options.width, 0);
      this.opacity = new NumberAttr(options.opacity);
    }
    draw(ctx, geom, z, f) {
      ctx.globalAlpha = this.opacity.get(z, f);
      const radius = this.radius.get(z, f);
      const width = this.width.get(z, f);
      if (width > 0) {
        ctx.strokeStyle = this.stroke.get(z, f);
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.arc(geom[0][0].x, geom[0][0].y, radius + width / 2, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.fillStyle = this.fill.get(z, f);
      ctx.beginPath();
      ctx.arc(geom[0][0].x, geom[0][0].y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    place(layout, geom, feature) {
      const pt = geom[0];
      const a = new import_point_geometry3.default(geom[0][0].x, geom[0][0].y);
      const radius = this.radius.get(layout.zoom, feature);
      const bbox = {
        minX: a.x - radius,
        minY: a.y - radius,
        maxX: a.x + radius,
        maxY: a.y + radius
      };
      const draw = (ctx) => {
        this.draw(ctx, [[new import_point_geometry3.default(0, 0)]], layout.zoom, feature);
      };
      return [{ anchor: a, bboxes: [bbox], draw }];
    }
  };
  var CenteredSymbolizer = class {
    constructor(symbolizer) {
      this.symbolizer = symbolizer;
    }
    place(layout, geom, feature) {
      const a = geom[0][0];
      const placed = this.symbolizer.place(layout, [[new import_point_geometry3.default(0, 0)]], feature);
      if (!placed || placed.length === 0)
        return void 0;
      const firstLabel = placed[0];
      const bbox = firstLabel.bboxes[0];
      const width = bbox.maxX - bbox.minX;
      const height = bbox.maxY - bbox.minY;
      const centered = {
        minX: a.x - width / 2,
        maxX: a.x + width / 2,
        minY: a.y - height / 2,
        maxY: a.y + height / 2
      };
      const draw = (ctx) => {
        ctx.translate(-width / 2, height / 2 - bbox.maxY);
        firstLabel.draw(ctx, { justify: Justify.Center });
      };
      return [{ anchor: a, bboxes: [centered], draw }];
    }
  };
  var TextSymbolizer = class {
    constructor(options) {
      this.font = new FontAttr(options);
      this.text = new TextAttr(options);
      this.fill = new StringAttr(options.fill, "black");
      this.stroke = new StringAttr(options.stroke, "black");
      this.width = new NumberAttr(options.width, 0);
      this.lineHeight = new NumberAttr(options.lineHeight, 1);
      this.letterSpacing = new NumberAttr(options.letterSpacing, 0);
      this.maxLineCodeUnits = new NumberAttr(options.maxLineChars, 15);
      this.justify = options.justify;
    }
    place(layout, geom, feature) {
      const property = this.text.get(layout.zoom, feature);
      if (!property)
        return void 0;
      const font = this.font.get(layout.zoom, feature);
      layout.scratch.font = font;
      const letterSpacing = this.letterSpacing.get(layout.zoom, feature);
      const lines = linebreak(property, this.maxLineCodeUnits.get(layout.zoom, feature));
      let longestLine = "";
      let longestLineLen = 0;
      for (const line of lines) {
        if (line.length > longestLineLen) {
          longestLineLen = line.length;
          longestLine = line;
        }
      }
      const metrics = layout.scratch.measureText(longestLine);
      const width = metrics.width + letterSpacing * (longestLineLen - 1);
      const ascent = metrics.actualBoundingBoxAscent;
      const descent = metrics.actualBoundingBoxDescent;
      const lineHeight = (ascent + descent) * this.lineHeight.get(layout.zoom, feature);
      const a = new import_point_geometry3.default(geom[0][0].x, geom[0][0].y);
      const bbox = {
        minX: a.x,
        minY: a.y - ascent,
        maxX: a.x + width,
        maxY: a.y + descent + (lines.length - 1) * lineHeight
      };
      const draw = (ctx, extra) => {
        ctx.globalAlpha = 1;
        ctx.font = font;
        ctx.fillStyle = this.fill.get(layout.zoom, feature);
        const textStrokeWidth = this.width.get(layout.zoom, feature);
        let y = 0;
        for (const line of lines) {
          let startX = 0;
          if (this.justify === Justify.Center || extra && extra.justify === Justify.Center) {
            startX = (width - ctx.measureText(line).width) / 2;
          } else if (this.justify === Justify.Right || extra && extra.justify === Justify.Right) {
            startX = width - ctx.measureText(line).width;
          }
          if (textStrokeWidth) {
            ctx.lineWidth = textStrokeWidth * 2;
            ctx.strokeStyle = this.stroke.get(layout.zoom, feature);
            if (letterSpacing > 0) {
              let xPos = startX;
              for (const letter of line) {
                ctx.strokeText(letter, xPos, y);
                xPos += ctx.measureText(letter).width + letterSpacing;
              }
            } else {
              ctx.strokeText(line, startX, y);
            }
          }
          if (letterSpacing > 0) {
            let xPos = startX;
            for (const letter of line) {
              ctx.fillText(letter, xPos, y);
              xPos += ctx.measureText(letter).width + letterSpacing;
            }
          } else {
            ctx.fillText(line, startX, y);
          }
          y += lineHeight;
        }
      };
      return [{ anchor: a, bboxes: [bbox], draw }];
    }
  };
  var CenteredTextSymbolizer = class {
    constructor(options) {
      this.centered = new CenteredSymbolizer(new TextSymbolizer(options));
    }
    place(layout, geom, feature) {
      return this.centered.place(layout, geom, feature);
    }
  };
  var LineLabelPlacement;
  (function(LineLabelPlacement2) {
    LineLabelPlacement2[LineLabelPlacement2["Above"] = 1] = "Above";
    LineLabelPlacement2[LineLabelPlacement2["Center"] = 2] = "Center";
    LineLabelPlacement2[LineLabelPlacement2["Below"] = 3] = "Below";
  })(LineLabelPlacement || (LineLabelPlacement = {}));
  var LineLabelSymbolizer = class {
    constructor(options) {
      var _a2;
      this.font = new FontAttr(options);
      this.text = new TextAttr(options);
      this.fill = new StringAttr(options.fill, "black");
      this.stroke = new StringAttr(options.stroke, "black");
      this.width = new NumberAttr(options.width, 0);
      this.offset = new NumberAttr(options.offset, 0);
      this.position = (_a2 = options.position) !== null && _a2 !== void 0 ? _a2 : LineLabelPlacement.Above;
      this.maxLabelCodeUnits = new NumberAttr(options.maxLabelChars, 40);
      this.repeatDistance = new NumberAttr(options.repeatDistance, 250);
    }
    place(layout, geom, feature) {
      const name = this.text.get(layout.zoom, feature);
      if (!name)
        return void 0;
      if (name.length > this.maxLabelCodeUnits.get(layout.zoom, feature))
        return void 0;
      const minLabelableDim = 20;
      const fbbox = feature.bbox;
      if (fbbox.maxY - fbbox.minY < minLabelableDim && fbbox.maxX - fbbox.minX < minLabelableDim)
        return void 0;
      const font = this.font.get(layout.zoom, feature);
      layout.scratch.font = font;
      const metrics = layout.scratch.measureText(name);
      const width = metrics.width;
      const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      let repeatDistance = this.repeatDistance.get(layout.zoom, feature);
      if (layout.overzoom > 4)
        repeatDistance *= 1 << layout.overzoom - 4;
      const cellSize = height * 2;
      const labelCandidates = simpleLabel(geom, width, repeatDistance, cellSize);
      if (labelCandidates.length === 0)
        return void 0;
      const labels = [];
      for (const candidate of labelCandidates) {
        const dx = candidate.end.x - candidate.start.x;
        const dy = candidate.end.y - candidate.start.y;
        const cells = lineCells(candidate.start, candidate.end, width, cellSize / 2);
        const bboxes = cells.map((c) => {
          return {
            minX: c.x - cellSize / 2,
            minY: c.y - cellSize / 2,
            maxX: c.x + cellSize / 2,
            maxY: c.y + cellSize / 2
          };
        });
        const draw = (ctx) => {
          ctx.globalAlpha = 1;
          ctx.rotate(Math.atan2(dy, dx));
          if (dx < 0) {
            ctx.scale(-1, -1);
            ctx.translate(-width, 0);
          }
          let heightPlacement = 0;
          if (this.position === LineLabelPlacement.Below)
            heightPlacement += height;
          else if (this.position === LineLabelPlacement.Center)
            heightPlacement += height / 2;
          ctx.translate(0, heightPlacement - this.offset.get(layout.zoom, feature));
          ctx.font = font;
          const lineWidth = this.width.get(layout.zoom, feature);
          if (lineWidth) {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = this.stroke.get(layout.zoom, feature);
            ctx.strokeText(name, 0, 0);
          }
          ctx.fillStyle = this.fill.get(layout.zoom, feature);
          ctx.fillText(name, 0, 0);
        };
        labels.push({
          anchor: candidate.start,
          bboxes,
          draw,
          deduplicationKey: name,
          deduplicationDistance: repeatDistance
        });
      }
      return labels;
    }
  };

  // node_modules/protomaps-leaflet/dist/labeler.js
  var import_point_geometry5 = __toESM(require_point_geometry(), 1);
  var import_rbush = __toESM(require_rbush_min(), 1);

  // node_modules/protomaps-leaflet/dist/view.js
  var import_point_geometry4 = __toESM(require_point_geometry(), 1);

  // node_modules/protomaps-leaflet/dist/painter.js
  var import_point_geometry6 = __toESM(require_point_geometry(), 1);

  // node_modules/protomaps-leaflet/dist/frontends/static.js
  var R2 = 6378137;
  var MAXCOORD2 = R2 * Math.PI;

  // node_modules/protomaps-leaflet/dist/frontends/leaflet.js
  var import_point_geometry8 = __toESM(require_point_geometry(), 1);

  // src/mapbox-style.js
  function number(val, defaultValue) {
    return typeof val === "number" ? val : defaultValue;
  }
  function getGeomType(f) {
    if (f.geomType === 1)
      return "Point";
    else if (f.geomType === 2)
      return "LineString";
    else
      return "Polygon";
  }
  function filterFn(arr) {
    if (arr.includes("$type")) {
      if (arr[0] === "==") {
        return (z, f) => getGeomType(f) === arr[2];
      }
    }
    if (arr[0] === "==") {
      return (z, f) => f.props[arr[1]] === arr[2];
    }
    if (arr[0] === "!=") {
      return (z, f) => f.props[arr[1]] !== arr[2];
    }
    if (arr[0] === "!") {
      const sub = filterFn(arr[1]);
      return (z, f) => !sub(z, f);
    }
    if (arr[0] === "<") {
      return (z, f) => number(f.props[arr[1]], Infinity) < arr[2];
    }
    if (arr[0] === "<=") {
      return (z, f) => number(f.props[arr[1]], Infinity) <= arr[2];
    }
    if (arr[0] === ">") {
      return (z, f) => number(f.props[arr[1]], -Infinity) > arr[2];
    }
    if (arr[0] === ">=") {
      return (z, f) => number(f.props[arr[1]], -Infinity) >= arr[2];
    }
    if (arr[0] === "in") {
      return (z, f) => arr.slice(2, arr.length).includes(f.props[arr[1]]);
    }
    if (arr[0] === "!in") {
      return (z, f) => !arr.slice(2, arr.length).includes(f.props[arr[1]]);
    }
    if (arr[0] === "has") {
      return (z, f) => f.props.hasOwnProperty(arr[1]);
    }
    if (arr[0] === "!has") {
      return (z, f) => !f.props.hasOwnProperty(arr[1]);
    }
    if (arr[0] === "all") {
      const parts = arr.slice(1, arr.length).map((e) => filterFn(e));
      return (z, f) => parts.every((p) => {
        return p(z, f);
      });
    }
    if (arr[0] === "any") {
      const parts = arr.slice(1, arr.length).map((e) => filterFn(e));
      return (z, f) => parts.some((p) => {
        return p(z, f);
      });
    }
    console.log("Unimplemented filter: ", arr[0]);
    return (f) => false;
  }
  function numberFn(obj) {
    if (obj.stops) {
      return (z) => {
        return exp(obj.base || 1, obj.stops)(z - 1);
      };
    }
    if (obj[0] === "interpolate" && obj[1][0] === "exponential" && obj[2][0] === "zoom") {
      const slice = obj.slice(3);
      const stops = [];
      for (let i2 = 0; i2 < slice.length; i2 += 2) {
        stops.push([slice[i2], slice[i2 + 1]]);
      }
      return (z) => {
        return exp(obj[1][1], stops)(z - 1);
      };
    }
    if (obj[0] === "step" && obj[1][0] === "get") {
      const slice = obj.slice(2);
      const prop = obj[1][1];
      return (z, f) => {
        const val = f == null ? void 0 : f.props[prop];
        if (typeof val === "number") {
          if (val < slice[1])
            return slice[0];
          for (let i2 = 1; i2 < slice.length; i2 += 2) {
            if (val <= slice[i2])
              return slice[i2 + 1];
          }
        }
        return slice[slice.length - 1];
      };
    }
    console.log("Unimplemented numeric fn: ", obj);
    return (z) => 1;
  }
  function numberOrFn(obj, defaultValue = 0) {
    if (!obj)
      return defaultValue;
    if (typeof obj === "number") {
      return obj;
    }
    return (z, f) => f ? numberFn(obj)(z, f) : defaultValue;
  }
  function widthFn(width_obj, gap_obj) {
    const w = numberOrFn(width_obj, 1);
    const g = numberOrFn(gap_obj);
    return (z, f) => {
      const tmp = typeof w === "number" ? w : w(z, f);
      if (g) {
        return tmp + (typeof g === "number" ? g : g(z, f));
      }
      return tmp;
    };
  }
  function getFont(obj, fontsubmap) {
    const fontfaces = [];
    for (const wanted_face of obj["text-font"]) {
      if (fontsubmap.hasOwnProperty(wanted_face)) {
        fontfaces.push(fontsubmap[wanted_face]);
      }
    }
    if (fontfaces.length === 0)
      fontfaces.push({ face: "sans-serif" });
    const text_size = obj["text-size"];
    let weight = "";
    if (fontfaces.length && fontfaces[0].weight)
      weight = `${fontfaces[0].weight} `;
    let style = "";
    if (fontfaces.length && fontfaces[0].style)
      style = `${fontfaces[0].style} `;
    if (typeof text_size === "number") {
      return (z) => `${style}${weight}${text_size}px ${fontfaces.map((f) => f.face).join(", ")}`;
    }
    if (text_size.stops) {
      let base = 1.4;
      if (text_size.base)
        base = text_size.base;
      else
        text_size.base = base;
      const t = numberFn(text_size);
      return (z, f) => {
        return `${style}${weight}${t(z, f)}px ${fontfaces.map((f2) => f2.face).join(", ")}`;
      };
    }
    if (text_size[0] === "step") {
      const t = numberFn(text_size);
      return (z, f) => {
        return `${style}${weight}${t(z, f)}px ${fontfaces.map((f2) => f2.face).join(", ")}`;
      };
    }
    console.log("Can't parse font: ", obj);
    return (z) => "12px sans-serif";
  }
  function mapbox_style(obj, fontsubmap) {
    const paint_rules = [];
    const label_rules = [];
    const refs = /* @__PURE__ */ new Map();
    for (const layer of obj.layers) {
      refs.set(layer.id, layer);
      if (layer.layout && layer.layout.visibility === "none") {
        continue;
      }
      if (layer.type === "background") {
        continue;
      }
      if (layer.ref) {
        const referenced = refs.get(layer.ref);
        layer.type = referenced.type;
        layer.filter = referenced.filter;
        layer.source = referenced.source;
        layer["source-layer"] = referenced["source-layer"];
      }
      const sourceLayer = layer["source-layer"];
      let symbolizer;
      let filter = void 0;
      if (layer.filter) {
        filter = filterFn(layer.filter);
      }
      if (layer.type === "fill") {
        paint_rules.push({
          dataLayer: layer["source-layer"],
          filter,
          symbolizer: new PolygonSymbolizer({
            fill: layer.paint["fill-color"],
            opacity: numberOrFn(layer.paint["fill-opacity"], 1)
          })
        });
      } else if (layer.type === "fill-extrusion") {
        paint_rules.push({
          dataLayer: layer["source-layer"],
          filter,
          symbolizer: new PolygonSymbolizer({
            fill: layer.paint["fill-extrusion-color"],
            opacity: numberOrFn(layer.paint["fill-extrusion-opacity"], 1)
          })
        });
      } else if (layer.type === "line") {
        if (layer.paint["line-dasharray"]) {
          paint_rules.push({
            dataLayer: layer["source-layer"],
            filter,
            symbolizer: new LineSymbolizer({
              width: widthFn(
                layer.paint["line-width"],
                layer.paint["line-gap-width"]
              ),
              dash: layer.paint["line-dasharray"],
              dashColor: layer.paint["line-color"],
              opacity: numberOrFn(layer.paint["line-opacity"], 1)
            })
          });
        } else {
          paint_rules.push({
            dataLayer: layer["source-layer"],
            filter,
            symbolizer: new LineSymbolizer({
              color: layer.paint["line-color"],
              opacity: numberOrFn(layer.paint["line-opacity"], 1),
              width: widthFn(
                layer.paint["line-width"],
                layer.paint["line-gap-width"]
              )
            })
          });
        }
      } else if (layer.type === "symbol") {
        if (layer.layout["symbol-placement"] === "line") {
          label_rules.push({
            dataLayer: layer["source-layer"],
            filter,
            symbolizer: new LineLabelSymbolizer({
              font: getFont(layer.layout, fontsubmap),
              fill: layer.paint["text-color"],
              width: layer.paint["text-halo-width"],
              stroke: layer.paint["text-halo-color"],
              textTransform: layer.layout["text-transform"],
              label_props: layer.layout["text-field"] ? [layer.layout["text-field"]] : void 0
            })
          });
        } else {
          label_rules.push({
            dataLayer: layer["source-layer"],
            filter,
            symbolizer: new CenteredTextSymbolizer({
              font: getFont(layer.layout, fontsubmap),
              fill: layer.paint["text-color"],
              stroke: layer.paint["text-halo-color"],
              width: layer.paint["text-halo-width"],
              textTransform: layer.layout["text-transform"],
              label_props: layer.layout["text-field"] ? [layer.layout["text-field"]] : void 0
            })
          });
        }
      } else if (layer.type === "circle") {
        paint_rules.push({
          dataLayer: layer["source-layer"],
          filter,
          symbolizer: new CircleSymbolizer({
            radius: layer.paint["circle-radius"],
            fill: layer.paint["circle-color"],
            stroke: layer.paint["circle-stroke-color"],
            width: layer.paint["circle-stroke-width"],
            opacity: numberOrFn(layer.paint["circle-opacity"], 1)
          })
        });
      }
    }
    label_rules.reverse();
    return { paint_rules, label_rules, paintRules: paint_rules, labelRules: label_rules, tasks: [] };
  }
  return __toCommonJS(src_exports);
})();
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
