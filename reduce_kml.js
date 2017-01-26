/**
 * Created by zhuyuan.xiang on 25/1/17.
 */


"use strict";
var _get = function get(object, property, receiver) {
  if (object === null)
    object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined
    } else {
      return get(parent, property, receiver)
    }
  } else if ("value"in desc) {
    return desc.value
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined
    }
    return getter.call(receiver)
  }
};
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value"in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor
  }
})();
function _typeof(obj) {
  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj
}
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  } else {
    return Array.from(arr)
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}
var altitude_decimals = false;
var compressLatLngs = false;
var compressionLength = 5;
function isEmpty(obj) {
  return typeof obj === 'undefined' || obj === null || obj === ""
}
var enums = {
  unitsEnum: {
    fraction: "fraction",
    pixels: "pixels",
    insetPixels: "insetPixels"
  },
  shapeEnum: {
    rectangle: "rectangle",
    cylinder: "cylinder",
    sphere: "sphere"
  },
  gridOrigin: {
    lowerLeft: "lowerLeft",
    upperLeft: "upperLeft"
  },
  altitudeModeEnum: {
    clampToGround: "clampToGround",
    clampToSeaFloor: "clampToSeaFloor",
    relativeToGround: "relativeToGround",
    relativeToSeaFloor: "relativeToSeaFloor",
    absolute: "absolute"
  },
  colorModeEnum: {
    normal: "normal",
    random: "random"
  },
  playModeEnum: {
    pause: "pause"
  },
  flyToModeEnum: {
    smooth: "smooth",
    bounce: "bounce"
  },
  styleStateEnum: {
    normal: "normal",
    highlight: "highlight"
  },
  displayModeEnum: {
    default: "default",
    hide: "hide"
  },
  itemIconModeEnum: {
    open: "open",
    closed: "closed",
    error: "error",
    fetching0: "fetching0",
    fetching1: "fetching1",
    fetching2: "fetching2"
  },
  refreshModeEnum: {
    onChange: "onChange",
    onInterval: "onInterval",
    onExpire: "onExpire"
  },
  viewRefreshModeEnum: {
    never: "never",
    onStop: "onStop",
    onRequest: "onRequest",
    onRegion: "onRegion"
  },
  listItemTypeEnum: {
    check: "check",
    checkOffOnly: "checkOffOnly",
    checkHideChildren: "checkHideChildren",
    radioFolder: "radioFolder"
  }
};
var Kml = (function() {
  function Kml(feature, networkLinkControl) {
    _classCallCheck(this, Kml);
    this.features = [];
    this.networkLinkControl = networkLinkControl;
    if (!isEmpty(feature))
      this.features.push(feature)
  }
  _createClass(Kml, [{
    key: "toKml",
    value: function toKml() {
      var KML_START = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\" xmlns:kml=\"http://www.opengis.net/kml/2.2\" xmlns:atom=\"http://www.w3.org/2005/Atom\">";
      var KML_END = "</kml>";
      var featuresKml = this.features.length > 0 ? this.features[0].toKml() : "";
      var networkLinkControlKml = !isEmpty(this.networkLinkControl) ? this.networkLinkControl.toKml() : "";
      return KML_START + networkLinkControlKml + featuresKml + KML_END
    }
  }], [{
    key: "wrapKml",
    value: function wrapKml(feature, networkLinkControl) {
      networkLinkControl = typeof networkLinkControl !== 'undefined' ? networkLinkControl.toKml() : "";
      var KML_START = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\" xmlns:kml=\"http://www.opengis.net/kml/2.2\" xmlns:atom=\"http://www.w3.org/2005/Atom\">";
      var KML_END = "</kml>";
      return KML_START + networkLinkControl + feature.toKml() + KML_END
    }
  }, {
    key: "tagVec2",
    value: function tagVec2(tagName, vec2) {
      if (typeof vec2 === 'undefined')
        return "";
      if (typeof enums.unitsEnum[vec2.xunits] === 'undefined') {
        console.log("Invalid xunits tag: " + tagName + " units: " + vec2.xunits);
        return ""
      }
      if (typeof enums.unitsEnum[vec2.yunits] === 'undefined') {
        console.log("Invalid xunits tag: " + tagName + " units: " + vec2.yunits);
        return ""
      }
      return Kml.tag(tagName, 'empty', "", {
        x: vec2.x,
        y: vec2.y,
        xunits: vec2.xunits,
        yunits: vec2.yunits
      }, true)
    }
  }, {
    key: "tag",
    value: function tag(tagName, type, contents, attributes, notOptional) {
      var checkAngle = function checkAngle(min, max) {
        if (isNaN(contents)) {
          console.log("Invalid " + type + " value:" + contents + " tag:" + tagName);
          return contents
        }
        contents = +contents;
        if (contents < min || contents > max) {
          console.log("Warning: angle exceeds expected range: " + type + " value:" + contents + " tag:" + tagName);
          contents = Kml.normalizeAngle(contents, min, max);
          console.log("Normalized to: " + contents)
        }
        return
      };
      if (typeof contents === 'undefined' || contents === null || contents === "") {
        if (!notOptional && type !== 'empty')
          return ""
      }
      switch (type) {
        case 'boolean':
          if (contents === false || contents === 0)
            contents = "0";
          if (contents === true || contents === 1)
            contents = "1";
          if (contents !== "0" && contents !== "1") {
            console.log("Invalid value:" + contents + " tag:" + tagName);
            return ""
          }
          break;
        case 'string':
          if (typeof contents !== 'string') {
            console.log("Warning: Possible invalid value:" + contents + " tag:" + tagName);
            contents = String(contents)
          }
          if (/[&<]/g.test(contents)) {
            console.log("Warning: Possible invalid characters value:" + contents + " tag:" + tagName)
          }
          break;
        case 'html':
          contents = !/[&<]/g.test(contents) ? contents : Kml.wrapCDATA(contents);
          break;
        case 'xml':
          break;
        case 'altitudeMode':
          if (typeof enums.altitudeModeEnum[contents] === 'undefined') {
            console.log("Invalid " + type + " value:" + contents + " tag:" + tagName);
            return ""
          }
          if (contents === enums.altitudeModeEnum.clampToSeaFloor || contents === enums.altitudeModeEnum.relativeToSeaFloor)
            tagName = "gx:altitudeMode";
          break;
        case 'color':
          var a = parseInt(contents, 16);
          if (typeof contents !== 'string' || contents.length !== 8 || a.toString(16).pad(8) !== contents.toLowerCase()) {
            console.log("Invalid " + type + " value:" + contents + " tag:" + tagName);
            return ""
          }
          break;
        case 'angle90':
          checkAngle(-90, 90);
          break;
        case 'angle180':
          checkAngle(-180, 180);
          break;
        case 'angle360':
          checkAngle(-360, 360);
          break;
        case 'anglepos90':
          checkAngle(0, 90);
          break;
        case 'anglepos180':
          checkAngle(0, 180);
          break;
        case 'empty':
          if (!isEmpty(contents)) {
            console.log("Warning: tag should have been empty: " + type + " value:" + contents + " tag:" + tagName)
          }
          break;
        case 'dateTime':
          break;
        case 'uri':
        case 'url':
          break;
        case 'coordinates':
          break;
        case 'int':
        case 'integer':
          if (isNaN(contents)) {
            console.log("Invalid " + type + " value:" + contents + " tag:" + tagName);
            return ""
          }
          var num = typeof contents === 'string' ? parseFloat(contents) : contents;
          if (num % 1 != 0)
            console.log("Warning: integer expected, found float: " + type + " value:" + contents + " tag:" + tagName);
          break;
        case 'double':
        case 'float':
          if (isNaN(contents)) {
            console.log("Invalid " + type + " value:" + contents + " tag:" + tagName);
            return ""
          }
          break;
        default:
          if (enums.hasOwnProperty(type)) {
            if (!enums[type].hasOwnProperty(contents)) {
              console.log("Invalid " + type + " value:" + contents + " tag:" + tagName);
              return ""
            }
            break
          }
          console.log("Invalid type:" + type + " tag:" + tagName);
          return "";
      }
      return Kml.tagWithAttributes(tagName, contents, attributes)
    }
  }, {
    key: "normalizeAngle",
    value: function normalizeAngle(angle, min, max) {
      angle = +angle;
      if (angle < min || angle > max) {
        while (angle < min) {
          angle += max - min
        }
        while (angle > max) {
          angle -= max - min
        }
      }
      return angle
    }
  }, {
    key: "tagWithAttributes",
    value: function tagWithAttributes(tagName, contents, attributes) {
      var attributesKml = "";
      if (!isEmpty(attributes)) {
        var attributeKeys = Object.keys(attributes);
        attributeKeys.forEach(function(key) {
          var attribute = attributes[key];
          if (!isEmpty(attribute))
            attributesKml += " " + key + "=\"" + attribute + "\""
        })
      }
      contents = !isEmpty(contents) ? contents : "";
      return "<" + tagName + attributesKml + ">" + contents + "</" + tagName + ">"
    }
  }, {
    key: "wrapCDATA",
    value: function wrapCDATA(contents) {
      return "<![CDATA[" + contents + "]]>"
    }
  }]);
  return Kml
})();
var KmlObject = (function() {
  function KmlObject(id, targetId) {
    _classCallCheck(this, KmlObject);
    this.id = id;
    this.targetId = targetId
  }
  _createClass(KmlObject, [{
    key: "setTargetId",
    value: function setTargetId(targetId) {
      this.targetId = targetId;
      return this
    }
  }]);
  return KmlObject
})();
var Feature = (function(_KmlObject) {
  _inherits(Feature, _KmlObject);
  function Feature(name, id, targetId) {
    _classCallCheck(this, Feature);
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Feature).call(this, id, targetId));
    _this.name = name;
    _this.styles = [];
    return _this
  }
  _createClass(Feature, [{
    key: "setDescription",
    value: function setDescription(description) {
      this.description = description;
      return this
    }
  }, {
    key: "setVisibility",
    value: function setVisibility(visibility) {
      this.visibility = visibility;
      return this
    }
  }, {
    key: "setOpen",
    value: function setOpen(open) {
      this.open = open;
      return this
    }
  }, {
    key: "setAbstractView",
    value: function setAbstractView(abstractView) {
      this.abstractView = abstractView;
      return this
    }
  }, {
    key: "setTimeStamp",
    value: function setTimeStamp(when) {
      this.timePrimitive = new TimePrimitive('timeStamp',when);
      return this
    }
  }, {
    key: "setTimeSpan",
    value: function setTimeSpan(begin, end) {
      this.timePrimitive = new TimePrimitive('timeSpan',begin,end);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("name", 'string', this.name);
      kml += Kml.tag("visibility", 'boolean', this.visibility);
      kml += Kml.tag("open", 'boolean', this.open);
      kml += Kml.tag("atom:author", 'xml', this.author, {
        "xmlns:atom": "http://www.w3.org/2005/Atom"
      });
      if (!isEmpty(this.linkHref))
        kml += Kml.tag("atom:link", 'string', null, {
          "xmlns:atom": "http://www.w3.org/2005/Atom",
          href: this.linkHref
        }, true);
      kml += Kml.tag("address", 'string', this.address);
      kml += Kml.tag("xal:AddressDetails", 'xml', this.addressDetails, {
        "xmlns:xal": "urn:oasis:names:tc:ciq:xsdschema:xAL:2.0"
      });
      kml += Kml.tag("phoneNumber", 'string', this.phoneNumber);
      kml += Kml.tag("Snippet", 'string', this.snippet, {
        maxLines: this.snippetMaxLines
      });
      kml += Kml.tag("description", 'html', this.description);
      if (!isEmpty(this.abstractView)) {
        kml += this.abstractView.toKml()
      }
      if (!isEmpty(this.timePrimitive)) {
        kml += this.timePrimitive.toKml()
      }
      kml += Kml.tag("styleUrl", 'string', this.styleUrl);
      if (!isEmpty(this.styles)) {
        kml = this.styles.reduce(function(p, c) {
          return p + c.toKml()
        }, kml)
      }
      if (!isEmpty(this.region)) {
        kml += this.region.toKml()
      }
      if (!isEmpty(this.extendedData)) {
        kml += this.extendedData.toKml()
      }
      return kml
    }
  }]);
  return Feature
})(KmlObject);
var ExtendedData = (function() {
  function ExtendedData() {
    _classCallCheck(this, ExtendedData);
    this.datas = []
  }
  _createClass(ExtendedData, [{
    key: "addData",
    value: function addData(name, displayName, value) {
      var data = new Data(name,displayName,value);
      this.datas.push(data);
      return this
    }
  }, {
    key: "setSchemaDataUrl",
    value: function setSchemaDataUrl(schemaUrl) {
      if (isEmpty(this.schemaData))
        this.schemaData = new SchemaData(schemaUrl);
      else
        this.schemaData.schemaUrl = schemaUrl;
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = this.datas.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      if (!isEmpty(this.schemaData)) {
        kml += this.schemaData.toKml()
      }
      return Kml.tag("ExtendedData", 'xml', kml)
    }
  }]);
  return ExtendedData
})();
var Data = (function() {
  function Data(name, displayName, value) {
    _classCallCheck(this, Data);
    this.name = name;
    this.displayName = displayName;
    this.value = value
  }
  _createClass(Data, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("displayName", 'html', this.displayName);
      kml += Kml.tag("value", 'string', this.value);
      return Kml.tag("Data", 'xml', kml, {
        name: this.name
      })
    }
  }]);
  return Data
})();
var SchemaData = (function() {
  function SchemaData(schemaUrl) {
    _classCallCheck(this, SchemaData);
    this.schemaUrl = schemaUrl;
    this.simpleDatas = [];
    this.simpleArrayDatas = []
  }
  _createClass(SchemaData, [{
    key: "addSimpleData",
    value: function addSimpleData(name, contents) {
      var simpleData = new SimpleData(name,contents);
      this.simpleDatas.push(simpleData);
      return this
    }
  }, {
    key: "addSimpleArrayData",
    value: function addSimpleArrayData(name, contents) {
      var simpleArrayData = new SimpleArrayData(name,contents);
      this.simpleArrayDatas.push(simpleArrayData);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = this.simpleDatas.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      kml = this.simpleArrayDatas.reduce(function(p, c) {
        return p + c.toKml()
      }, kml);
      return Kml.tag("SchemaData", 'xml', kml, {
        schemaUrl: this.schemaUrl
      })
    }
  }]);
  return SchemaData
})();
var SimpleData = (function() {
  function SimpleData(name, contents) {
    _classCallCheck(this, SimpleData);
    this.name = name;
    this.contents = contents
  }
  _createClass(SimpleData, [{
    key: "toKml",
    value: function toKml() {
      return Kml.tag("SimpleData", 'string', this.contents, {
        name: this.name
      })
    }
  }]);
  return SimpleData
})();
var SimpleArrayData = (function() {
  function SimpleArrayData(name, contents) {
    _classCallCheck(this, SimpleArrayData);
    this.name = name;
    if (typeof contents !== 'undefined') {
      this.contents = contents
    } else {
      this.contents = []
    }
  }
  _createClass(SimpleArrayData, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.contents.reduce(function(p, c) {
        return p + Kml.tag("gx:value", 'string', c)
      }, "");
      return Kml.tag("gx:SimpleArrayData", 'xml', kml, {
        name: this.name
      })
    }
  }]);
  return SimpleArrayData
})();
var NetworkLink = (function(_Feature) {
  _inherits(NetworkLink, _Feature);
  function NetworkLink(name, refreshVisibility, flyToView, link, id, targetId) {
    _classCallCheck(this, NetworkLink);
    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(NetworkLink).call(this, name, id, targetId));
    _this2.name = name;
    _this2.refreshVisibility = refreshVisibility;
    _this2.flyToView = flyToView;
    _this2.link = link;
    return _this2
  }
  _createClass(NetworkLink, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(NetworkLink.prototype), "toKml", this).call(this);
      kml += Kml.tag("refreshVisibility", 'boolean', this.refreshVisibility);
      kml += Kml.tag("flyToView", 'boolean', this.flyToView);
      if (!isEmpty(this.link))
        kml += this.link.toKml();
      return Kml.tag("NetworkLink", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return NetworkLink
})(Feature);
var NetworkLinkControl = (function() {
  function NetworkLinkControl() {
    _classCallCheck(this, NetworkLinkControl);
    this.update = new Update()
  }
  _createClass(NetworkLinkControl, [{
    key: "addChange",
    value: function addChange(change) {
      if (isEmpty(this.update.change))
        this.update.change = new Change();
      this.update.change.changes.push(change);
      return this
    }
  }, {
    key: "addCreate",
    value: function addCreate(create) {
      if (isEmpty(this.update.create))
        this.update.create = new Create();
      this.update.create.creates.push(create);
      return this
    }
  }, {
    key: "addDelete",
    value: function addDelete(_delete) {
      if (isEmpty(this.update.delete))
        this.update.delete = new Delete();
      this.update.delete.deletes.push(_delete);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("minRefreshPeriod", 'float', this.minRefreshPeriod);
      kml += Kml.tag("maxSessionLength", 'float', this.maxSessionLength);
      kml += Kml.tag("cookie", 'string', this.cookie);
      kml += Kml.tag("message", 'string', this.message);
      kml += Kml.tag("linkName", 'string', this.linkName);
      kml += Kml.tag("linkDescription", 'string', this.linkDescription);
      kml += Kml.tag("linkSnippet", 'string', this.linkSnippet, {
        maxLines: this.linkSnippetMaxLines
      });
      kml += Kml.tag("expires", 'dateTime', this.expires);
      if (!isEmpty(this.update))
        kml += this.update.toKml();
      if (!isEmpty(this.abstractView))
        kml += this.abstractView.toKml();
      return Kml.tag("NetworkLinkControl", 'xml', kml)
    }
  }]);
  return NetworkLinkControl
})();
var Link = (function(_KmlObject2) {
  _inherits(Link, _KmlObject2);
  function Link(href, id, targetId) {
    _classCallCheck(this, Link);
    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, id, targetId));
    _this3.href = href;
    return _this3
  }
  _createClass(Link, [{
    key: "setRefresh",
    value: function setRefresh(refreshMode, refreshInterval) {
      this.refreshMode = refreshMode;
      this.refreshInterval = refreshInterval;
      return this
    }
  }, {
    key: "setViewRefresh",
    value: function setViewRefresh(viewRefreshMode, viewRefreshTime) {
      this.viewRefreshMode = viewRefreshMode;
      this.viewRefreshTime = viewRefreshTime;
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("href", 'string', this.href);
      kml += Kml.tag("refreshMode", 'refreshModeEnum', this.refreshMode);
      kml += Kml.tag("refreshInterval", 'float', this.refreshInterval);
      kml += Kml.tag("viewRefreshMode", 'viewRefreshModeEnum', this.viewRefreshMode);
      kml += Kml.tag("viewRefreshTime", 'float', this.viewRefreshTime);
      kml += Kml.tag("viewBoundScale", 'float', this.viewBoundScale);
      kml += Kml.tag("viewFormat", 'xml', this.viewFormat);
      kml += Kml.tag("httpQuery", 'string', this.httpQuery);
      return Kml.tag("Link", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }], [{
    key: "getViewFormatStringAll",
    value: function getViewFormatStringAll() {
      return "BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]&LookAt=[lookatLon],[lookatLat],[lookatRange],[lookatTilt],[lookatHeading],[lookatTerrainLon],[lookatTerrainLat],[lookatTerrainAlt]&Camera=[cameraLon],[cameraLat],[cameraAlt],[horizFov],[vertFov]&Other=[horizPixels],[vertPixels],[terrainEnabled]"
    }
  }]);
  return Link
})(KmlObject);
var Container = (function(_Feature2) {
  _inherits(Container, _Feature2);
  function Container(name, id, targetId) {
    _classCallCheck(this, Container);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this, name, id, targetId))
  }
  _createClass(Container, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(Container.prototype), "toKml", this).call(this);
      return kml
    }
  }]);
  return Container
})(Feature);
var Folder = (function(_Container) {
  _inherits(Folder, _Container);
  function Folder(name, id, targetId) {
    _classCallCheck(this, Folder);
    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Folder).call(this, name, id, targetId));
    _this5.features = [];
    return _this5
  }
  _createClass(Folder, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(Folder.prototype), "toKml", this).call(this);
      kml = this.features.reduce(function(p, c) {
        return p + c.toKml()
      }, kml);
      return Kml.tag("Folder", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Folder
})(Container);
var Document = (function(_Container2) {
  _inherits(Document, _Container2);
  function Document(name, id, targetId) {
    _classCallCheck(this, Document);
    var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(Document).call(this, name, id, targetId));
    _this6.schemas = [];
    _this6.features = [];
    return _this6
  }
  _createClass(Document, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(Document.prototype), "toKml", this).call(this);
      kml = this.schemas.reduce(function(p, c) {
        return p + c.toKml()
      }, kml);
      kml = this.features.reduce(function(p, c) {
        return p + c.toKml()
      }, kml);
      return Kml.tag("Document", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Document
})(Container);
var Schema = (function() {
  function Schema(name, id) {
    _classCallCheck(this, Schema);
    this.name = name;
    this.id = id;
    this.simpleFields = []
  }
  _createClass(Schema, [{
    key: "addSimpleField",
    value: function addSimpleField(type, name, displayName) {
      this.simpleFields.push(new SimpleField(type,name,displayName));
      return this
    }
  }, {
    key: "addSimpleArrayField",
    value: function addSimpleArrayField(type, name, displayName) {
      this.simpleFields.push(new SimpleField(type,name,displayName));
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = this.simpleFields.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("Schema ", 'xml', kml, {
        name: this.name,
        id: this.id
      }, true)
    }
  }]);
  return Schema
})();
var SimpleField = (function() {
  function SimpleField(type, name, displayName) {
    _classCallCheck(this, SimpleField);
    this.type = type;
    this.name = name;
    this.displayName = displayName
  }
  _createClass(SimpleField, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("displayName", 'html', this.displayName);
      return Kml.tag("SimpleField", 'xml', kml, {
        type: this.type,
        name: this.name
      }, true)
    }
  }]);
  return SimpleField
})();
var SimpleArrayField = (function() {
  function SimpleArrayField(type, name, displayName) {
    _classCallCheck(this, SimpleArrayField);
    this.type = type;
    this.name = name;
    this.displayName = displayName
  }
  _createClass(SimpleArrayField, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("displayName", 'html', this.displayName);
      return Kml.tag("gx:SimpleArrayField", 'xml', kml, {
        type: this.type,
        name: this.name
      }, true)
    }
  }]);
  return SimpleArrayField
})();
var Geometry = (function(_KmlObject3) {
  _inherits(Geometry, _KmlObject3);
  function Geometry(type, coordinates, id, targetId) {
    _classCallCheck(this, Geometry);
    var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Geometry).call(this, id, targetId));
    _this7.type = type;
    if (!isEmpty(coordinates)) {
      _this7.setCoordinates(coordinates)
    }
    return _this7
  }
  _createClass(Geometry, [{
    key: "setCoordinates",
    value: function setCoordinates(coordinates) {
      coordinates = !isEmpty(coordinates) ? Array.isArray(coordinates) ? coordinates : [coordinates] : [];
      if (this.type === 'Polygon') {
        this.outerBoundaryIs = new OuterBoundaryIs(new LinearRing(coordinates))
      } else {
        this.coordinates = coordinates
      }
      return this
    }
  }, {
    key: "removeDuplicates",
    value: function removeDuplicates(isRing) {
      var i = 1;
      while (i < this.coordinates.length) {
        if (this.coordinates[i].equals(this.coordinates[i - 1]))
          this.coordinates.splice(i, 1);
        else
          i += 1
      }
      if (isRing && this.coordinates.length > 1 && this.coordinates[0].equals(this.coordinates[this.coordinates.length - 1]))
        this.coordinates.pop()
    }
  }, {
    key: "coordinatesToKml",
    value: function coordinatesToKml(isRing) {
      var kml = "";
      if (typeof this.coordinates !== 'undefined') {
        this.removeDuplicates();
        kml = this.coordinates.reduce(function(p, c) {
          return p + c.toKml()
        }, kml);
        if (isRing && this.coordinates.length > 0 && !this.coordinates[0].equals(this.coordinates[this.coordinates.length - 1])) {
          kml += this.coordinates[0].toKml()
        }
      }
      return kml.trim()
    }
  }], [{
    key: "area",
    value: function area(coordinates) {
      return Math.abs(this.areaAndPerimeter(coordinates).area.toFixed(1))
    }
  }, {
    key: "perimeter",
    value: function perimeter(coordinates) {
      return this.areaAndPerimeter(coordinates).perimeter.toFixed(3)
    }
  }, {
    key: "areaAndPerimeter",
    value: function areaAndPerimeter(coordinates) {
      var geod = GeographicLib.Geodesic.WGS84;
      var polygon = geod.Polygon(false);
      coordinates.forEach(function(coordinate) {
        return polygon.AddPoint(coordinate.lat, coordinate.lng)
      });
      return polygon.Compute(true, true)
    }
  }]);
  return Geometry
})(KmlObject);
var LineString = (function(_Geometry) {
  _inherits(LineString, _Geometry);
  function LineString(coordinates, tessellate, id, targetId) {
    _classCallCheck(this, LineString);
    var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(LineString).call(this, "LineString", coordinates, id, targetId));
    _this8.tessellate = tessellate;
    return _this8
  }
  _createClass(LineString, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("gx:altitudeOffset", 'double', this.altitudeOffset);
      kml += Kml.tag("extrude", 'boolean', this.extrude);
      kml += Kml.tag("tessellate", 'boolean', this.tessellate);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      kml += Kml.tag("gx:drawOrder", 'integer', this.drawOrder);
      kml += Kml.tag("coordinates", 'coordinates', this.coordinatesToKml());
      return Kml.tag("LineString", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return LineString
})(Geometry);
var Point = (function(_Geometry2) {
  _inherits(Point, _Geometry2);
  function Point(coordinates, id, targetId) {
    _classCallCheck(this, Point);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Point).call(this, 'Point', coordinates, id, targetId))
  }
  _createClass(Point, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("extrude", 'boolean', this.extrude);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      kml += Kml.tag("gx:drawOrder", 'integer', this.drawOrder);
      kml += Kml.tag("coordinates", 'coordinates', this.coordinatesToKml());
      return Kml.tag("Point", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Point
})(Geometry);
var MultiGeometry = (function(_Geometry3) {
  _inherits(MultiGeometry, _Geometry3);
  function MultiGeometry(id, targetId) {
    _classCallCheck(this, MultiGeometry);
    var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(MultiGeometry).call(this, 'MultiGeometry', undefined, id, targetId));
    _this10.geometries = [];
    return _this10
  }
  _createClass(MultiGeometry, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.geometries.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("MultiGeometry", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return MultiGeometry
})(Geometry);
var Polygon = (function(_Geometry4) {
  _inherits(Polygon, _Geometry4);
  function Polygon(coordinates, tessellate, id, targetId) {
    _classCallCheck(this, Polygon);
    var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Polygon).call(this, 'Polygon', coordinates, id, targetId));
    _this11.tessellate = tessellate;
    _this11.innerBoundaryIss = [];
    return _this11
  }
  _createClass(Polygon, [{
    key: "addInnerBoundary",
    value: function addInnerBoundary(coordinates) {
      this.innerBoundaryIss.push(new InnerBoundaryIs(new LinearRing(coordinates)));
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("extrude", 'boolean', this.extrude);
      kml += Kml.tag("tessellate", 'boolean', this.tessellate);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      if (!isEmpty(this.outerBoundaryIs)) {
        kml += this.outerBoundaryIs.toKml()
      }
      kml = this.innerBoundaryIss.reduce(function(p, c) {
        return p + c.toKml()
      }, kml);
      return Kml.tag("Polygon", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Polygon
})(Geometry);
var OuterBoundaryIs = (function() {
  function OuterBoundaryIs(linearRing) {
    _classCallCheck(this, OuterBoundaryIs);
    this.linearRing = linearRing
  }
  _createClass(OuterBoundaryIs, [{
    key: "toKml",
    value: function toKml() {
      if (!isEmpty(this.linearRing)) {
        return Kml.tag("outerBoundaryIs", 'xml', this.linearRing.toKml())
      }
    }
  }]);
  return OuterBoundaryIs
})();
var InnerBoundaryIs = (function() {
  function InnerBoundaryIs(linearRing) {
    _classCallCheck(this, InnerBoundaryIs);
    this.linearRings = [];
    if (typeof linearRing !== 'undefined')
      this.linearRings.push(linearRing)
  }
  _createClass(InnerBoundaryIs, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.linearRings.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("innerBoundaryIs", 'xml', kml)
    }
  }]);
  return InnerBoundaryIs
})();
var LinearRing = (function(_Geometry5) {
  _inherits(LinearRing, _Geometry5);
  function LinearRing(coordinates, tessellate, id, targetId) {
    _classCallCheck(this, LinearRing);
    var _this12 = _possibleConstructorReturn(this, Object.getPrototypeOf(LinearRing).call(this, 'LinearRing', coordinates, id, targetId));
    _this12.tessellate = tessellate;
    return _this12
  }
  _createClass(LinearRing, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("gx:altitudeOffset", 'double', this.altitudeOffset);
      Kml.tag("extrude", 'boolean', this.extrude);
      kml += Kml.tag("tessellate", 'boolean', this.tessellate);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      kml += Kml.tag("coordinates", 'coordinates', this.coordinatesToKml(true));
      return Kml.tag("LinearRing", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return LinearRing
})(Geometry);
var Model = (function(_Geometry6) {
  _inherits(Model, _Geometry6);
  function Model(altitudeMode, location, orientation, scale, link, resourceMap, id, targetId) {
    _classCallCheck(this, Model);
    var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this, null, id, targetId));
    _this13.altitudeMode = altitudeMode;
    _this13.location = location;
    _this13.orientation = orientation;
    _this13.scale = scale;
    _this13.link = link;
    _this13.resourceMap = resourceMap;
    return _this13
  }
  _createClass(Model, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      if (typeof this.location !== 'undefined')
        kml += this.location.toKml();
      if (typeof this.orientation !== 'undefined')
        kml += this.orientation.toKml();
      if (typeof this.scale !== 'undefined')
        kml += this.scale.toKml();
      if (typeof this.link !== 'undefined')
        kml += this.link.toKml();
      if (typeof this.resourceMap !== 'undefined')
        kml += this.resourceMap.toKml();
      return Kml.tag("Model", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Model
})(Geometry);
var Location = (function(_KmlObject4) {
  _inherits(Location, _KmlObject4);
  function Location(longitude, latitude, altitude, id, targetId) {
    _classCallCheck(this, Location);
    var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(Location).call(this, id, targetId));
    _this14.longitude = longitude;
    _this14.latitude = latitude;
    _this14.altitude = altitude;
    return _this14
  }
  _createClass(Location, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("longitude", 'angle180', this.longitude);
      kml += Kml.tag("latitude", 'angle90', this.latitude);
      kml += Kml.tag("altitude", 'double', this.altitude);
      return Kml.tag("Location", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Location
})(KmlObject);
var Orientation = (function(_KmlObject5) {
  _inherits(Orientation, _KmlObject5);
  function Orientation(heading, tilt, roll, id, targetId) {
    _classCallCheck(this, Orientation);
    var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(Orientation).call(this, id, targetId));
    _this15.heading = heading;
    _this15.tilt = tilt;
    _this15.roll = roll;
    return _this15
  }
  _createClass(Orientation, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("heading", 'angle360', this.heading);
      kml += Kml.tag("tilt", 'anglepos180', this.tilt);
      kml += Kml.tag("roll", 'angle180', this.roll);
      return Kml.tag("Orientation", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Orientation
})(KmlObject);
var Scale = (function(_KmlObject6) {
  _inherits(Scale, _KmlObject6);
  function Scale(x, y, z, id, targetId) {
    _classCallCheck(this, Scale);
    var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(Scale).call(this, id, targetId));
    _this16.x = x;
    _this16.y = y;
    _this16.z = z;
    return _this16
  }
  _createClass(Scale, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("x", 'double', this.x);
      kml += Kml.tag("y", 'double', this.y);
      kml += Kml.tag("z", 'double', this.z);
      return Kml.tag("Scale", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Scale
})(KmlObject);
var ResourceMap = (function(_KmlObject7) {
  _inherits(ResourceMap, _KmlObject7);
  function ResourceMap(id, targetId) {
    _classCallCheck(this, ResourceMap);
    var _this17 = _possibleConstructorReturn(this, Object.getPrototypeOf(ResourceMap).call(this, id, targetId));
    _this17.aliass = [];
    return _this17
  }
  _createClass(ResourceMap, [{
    key: "addAlias",
    value: function addAlias(targetHref, sourceHref) {
      var alias = new Alias(targetHref,sourceHref);
      this.aliass.push(alias);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = this.aliass.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("ResourceMap", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return ResourceMap
})(KmlObject);
var Alias = (function() {
  function Alias(targetHref, sourceHref) {
    _classCallCheck(this, Alias);
    this.targetHref = targetHref;
    this.sourceHref = sourceHref
  }
  _createClass(Alias, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("targetHref", 'string', this.targetHref);
      kml += Kml.tag("sourceHref", 'string', this.sourceHref);
      return Kml.tag("Alias", 'xml', kml)
    }
  }]);
  return Alias
})();
var Placemark = (function(_Feature3) {
  _inherits(Placemark, _Feature3);
  function Placemark(type, name, styleUrl, coordinates, id, targetId) {
    _classCallCheck(this, Placemark);
    var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(Placemark).call(this, name, id, targetId));
    _this18._type = type;
    _this18.styleUrl = styleUrl;
    if (!isEmpty(type)) {
      switch (type) {
        case "LineString":
          _this18.geometry = new LineString(coordinates,"1");
          break;
        case "Point":
          _this18.geometry = new Point(coordinates);
          break;
        case "Polygon":
          _this18.geometry = new Polygon(coordinates,"1");
          break;
        case "MultiGeometry":
          _this18.geometry = new MultiGeometry();
          break;
        case "LinearRing":
          _this18.geometry = new LinearRing(coordinates,"1");
          break;
        case "Model":
          break;
        default:
        case "Track":
          break;
          console.log("Warning: unknown placemark type");
      }
    }
    return _this18
  }
  _createClass(Placemark, [{
    key: "setModel",
    value: function setModel(altitudeMode, location, orientation, scale, link, resourceMap, id, targetId) {
      this.geometry = new Model(altitudeMode,location,orientation,scale,link,resourceMap,id,targetId);
      return this
    }
  }, {
    key: "setAltitudeMode",
    value: function setAltitudeMode(altitudeMode) {
      this.geometry.altitudeMode = altitudeMode;
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(Placemark.prototype), "toKml", this).call(this);
      kml += Kml.tag("gx:balloonVisibility", 'boolean', this.balloonVisibility);
      if (typeof this.geometry != 'undefined')
        kml += this.geometry.toKml();
      return Kml.tag("Placemark", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }, {
    key: "type",
    get: function get() {
      if (typeof this._type === 'undefined') {
        if (this.geometry instanceof LineString)
          this._type = "LineString";
        if (this.geometry instanceof Point)
          this._type = "Point";
        if (this.geometry instanceof MultiGeometry)
          this._type = "MultiGeometry";
        if (this.geometry instanceof LinearRing)
          this._type = "LinearRing";
        if (this.geometry instanceof Polygon)
          this._type = "Polygon";
        if (this.geometry instanceof Model)
          this._type = "Model";
        if (this.geometry instanceof Track)
          this._type = "Track"
      }
      return this._type
    },
    set: function set(type) {
      this._type = type
    }
  }, {
    key: "coordinates",
    get: function get() {
      switch (this.type) {
        case "LineString":
        case "Point":
        case "LinearRing":
          return this.geometry.coordinates;
          break;
        case "Polygon":
          return this.geometry.outerBoundaryIs.linearRing.coordinates;
          break;
        case "MultiGeometry":
        case "Model":
        case "Track":
        default:
          console.log("Warning: Geometry type " + this.type + " does not have coordinates");
      }
    },
    set: function set(coordinates) {
      switch (this.type) {
        case "LineString":
        case "Point":
        case "LinearRing":
          this.geometry.coordinates = coordinates;
          break;
        case "Polygon":
          this.geometry.outerBoundaryIs.linearRing.coordinates = coordinates;
          break;
        case "MultiGeometry":
        case "Model":
        case "Track":
        default:
          console.log("Warning: Geometry type " + this.type + " does not have coordinates");
      }
    }
  }]);
  return Placemark
})(Feature);
var StyleSelector = (function(_KmlObject8) {
  _inherits(StyleSelector, _KmlObject8);
  function StyleSelector(id, targetId) {
    _classCallCheck(this, StyleSelector);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(StyleSelector).call(this, id, targetId))
  }
  return StyleSelector
})(KmlObject);
var StyleMap = (function(_StyleSelector) {
  _inherits(StyleMap, _StyleSelector);
  function StyleMap(normal, highlight, id, targetId) {
    _classCallCheck(this, StyleMap);
    var _this20 = _possibleConstructorReturn(this, Object.getPrototypeOf(StyleMap).call(this, id, targetId));
    _this20.pairs = [];
    if (!isEmpty(normal)) {
      var normalPair = new Pair("normal");
      if (typeof normal === 'string')
        normalPair.styleUrl = normal;
      if (normal instanceof Style)
        normalPair.style = normal;
      _this20.pairs.push(normalPair)
    }
    if (!isEmpty(highlight)) {
      var highlightPair = new Pair("highlight");
      if (typeof highlight === 'string')
        highlightPair.styleUrl = highlight;
      if (highlight instanceof Style)
        highlightPair.style = highlight;
      _this20.pairs.push(highlightPair)
    }
    return _this20
  }
  _createClass(StyleMap, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.pairs.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("StyleMap", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return StyleMap
})(StyleSelector);
var Pair = (function(_StyleSelector2) {
  _inherits(Pair, _StyleSelector2);
  function Pair(key, id, targetId) {
    _classCallCheck(this, Pair);
    var _this21 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pair).call(this, id, targetId));
    _this21.key = key;
    return _this21
  }
  _createClass(Pair, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("key", 'styleStateEnum', this.key);
      if (!isEmpty(this.styleUrl))
        kml += Kml.tag("styleUrl", 'string', this.styleUrl);
      if (!isEmpty(this.style))
        kml += this.style.toKml();
      return Kml.tag("Pair", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return Pair
})(StyleSelector);
var Style = (function(_StyleSelector3) {
  _inherits(Style, _StyleSelector3);
  function Style(id, targetId) {
    _classCallCheck(this, Style);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Style).call(this, id, targetId))
  }
  _createClass(Style, [{
    key: "setLineStyle",
    value: function setLineStyle(color, width) {
      this.lineStyle = new LineStyle(color,width);
      return this
    }
  }, {
    key: "setPolyStyle",
    value: function setPolyStyle(color, fill, outline) {
      this.polyStyle = new PolyStyle(color,fill,outline);
      return this
    }
  }, {
    key: "setNoFill",
    value: function setNoFill() {
      this.setPolyStyle("", "0");
      return this
    }
  }, {
    key: "setIconStyle",
    value: function setIconStyle(color, scale, iconHref, heading) {
      this.iconStyle = new IconStyle(color,scale,iconHref,heading);
      return this
    }
  }, {
    key: "setNoIcon",
    value: function setNoIcon() {
      this.iconStyle = new IconStyle();
      return this
    }
  }, {
    key: "setRadioListStyle",
    value: function setRadioListStyle() {
      this.listStyle = new ListStyle();
      this.listStyle.listItemType = "radioFolder";
      return this
    }
  }, {
    key: "setLabelStyle",
    value: function setLabelStyle(color, scale) {
      this.labelStyle = new LabelStyle(color,scale);
      return this
    }
  }, {
    key: "setIconHotSpot",
    value: function setIconHotSpot(x, y, xunits, yunits) {
      if (typeof this.iconStyle === 'undefined')
        this.iconStyle = new IconStyle();
      this.iconStyle.setHotSpot(x, y, xunits, yunits);
      return this
    }
  }, {
    key: "setBalloonStyle",
    value: function setBalloonStyle(bgColor, textColor, text, displayMode) {
      this.balloonStyle = new BalloonStyle(bgColor,textColor,text,displayMode);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = "";
      if (!isEmpty(this.lineStyle))
        kml += this.lineStyle.toKml();
      if (!isEmpty(this.polyStyle))
        kml += this.polyStyle.toKml();
      if (!isEmpty(this.iconStyle))
        kml += this.iconStyle.toKml();
      if (!isEmpty(this.labelStyle))
        kml += this.labelStyle.toKml();
      if (!isEmpty(this.balloonStyle))
        kml += this.balloonStyle.toKml();
      if (!isEmpty(this.listStyle))
        kml += this.listStyle.toKml();
      return Kml.tag("Style", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return Style
})(StyleSelector);
var SubStyle = (function(_KmlObject9) {
  _inherits(SubStyle, _KmlObject9);
  function SubStyle() {
    _classCallCheck(this, SubStyle);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(SubStyle).apply(this, arguments))
  }
  return SubStyle
})(KmlObject);
var BalloonStyle = (function(_SubStyle) {
  _inherits(BalloonStyle, _SubStyle);
  function BalloonStyle(bgColor, textColor, text, displayMode, id, targetId) {
    _classCallCheck(this, BalloonStyle);
    var _this24 = _possibleConstructorReturn(this, Object.getPrototypeOf(BalloonStyle).call(this, id, targetId));
    _this24.bgColor = bgColor;
    _this24.textColor = textColor;
    _this24.text = text;
    _this24.displayMode = displayMode;
    return _this24
  }
  _createClass(BalloonStyle, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("bgColor", 'color', this.bgColor);
      kml += Kml.tag("textColor", 'color', this.textColor);
      kml += Kml.tag("text", 'html', this.text);
      kml += Kml.tag("displayMode", 'displayModeEnum', this.displayMode);
      return Kml.tag("BalloonStyle", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return BalloonStyle
})(SubStyle);
var ListStyle = (function(_SubStyle2) {
  _inherits(ListStyle, _SubStyle2);
  function ListStyle(id, targetId) {
    _classCallCheck(this, ListStyle);
    var _this25 = _possibleConstructorReturn(this, Object.getPrototypeOf(ListStyle).call(this, id, targetId));
    _this25.itemIcons = [];
    return _this25
  }
  _createClass(ListStyle, [{
    key: "addItemIcon",
    value: function addItemIcon(state, href) {
      var itemIcon = new ItemIcon(state,href);
      this.itemIcons.push(itemIcon)
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("listItemType", 'listItemTypeEnum', this.listItemType);
      kml += Kml.tag("bgColor", 'color', this.bgColor);
      kml = this.itemIcons.reduce(function(p, c) {
        return p + c.toKml()
      }, kml);
      return Kml.tag("ListStyle", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return ListStyle
})(SubStyle);
var ItemIcon = (function() {
  function ItemIcon(state, href) {
    _classCallCheck(this, ItemIcon);
    this.state = state;
    this.href = href
  }
  _createClass(ItemIcon, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("state", 'itemIconModeEnum', this.state);
      kml += Kml.tag("href", 'uri', this.href);
      return Kml.tag("ItemIcon", 'xml', kml)
    }
  }]);
  return ItemIcon
})();
var ColorStyle = (function(_SubStyle3) {
  _inherits(ColorStyle, _SubStyle3);
  function ColorStyle(id, targetId) {
    _classCallCheck(this, ColorStyle);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(ColorStyle).call(this, id, targetId))
  }
  _createClass(ColorStyle, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("color", 'color', this.color);
      kml += Kml.tag("colorMode", 'colorModeEnum', this.colorMode);
      return kml
    }
  }]);
  return ColorStyle
})(SubStyle);
var LineStyle = (function(_ColorStyle) {
  _inherits(LineStyle, _ColorStyle);
  function LineStyle(color, width, id, targetId) {
    _classCallCheck(this, LineStyle);
    var _this27 = _possibleConstructorReturn(this, Object.getPrototypeOf(LineStyle).call(this, id, targetId));
    _this27.color = color;
    _this27.width = width;
    return _this27
  }
  _createClass(LineStyle, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(LineStyle.prototype), "toKml", this).call(this);
      kml += Kml.tag("width", 'float', this.width);
      kml += Kml.tag("gx:outerColor", 'color', this.outerColor);
      kml += Kml.tag("gx:outerWidth", 'float', this.outerWidth);
      kml += Kml.tag("gx:physicalWidth", 'float', this.physicalWidth);
      kml += Kml.tag("gx:labelVisibility", 'boolean', this.labelVisibility);
      return Kml.tag("LineStyle", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return LineStyle
})(ColorStyle);
var PolyStyle = (function(_ColorStyle2) {
  _inherits(PolyStyle, _ColorStyle2);
  function PolyStyle(color, fill, outline, id, targetId) {
    _classCallCheck(this, PolyStyle);
    var _this28 = _possibleConstructorReturn(this, Object.getPrototypeOf(PolyStyle).call(this, id, targetId));
    _this28.color = color;
    _this28.fill = fill;
    _this28.outline = outline;
    return _this28
  }
  _createClass(PolyStyle, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(PolyStyle.prototype), "toKml", this).call(this);
      kml += Kml.tag("fill", 'boolean', this.fill);
      kml += Kml.tag("outline", 'boolean', this.outline);
      return Kml.tag("PolyStyle", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return PolyStyle
})(ColorStyle);
var IconStyle = (function(_ColorStyle3) {
  _inherits(IconStyle, _ColorStyle3);
  function IconStyle(color, scale, iconHref, heading, id, targetId) {
    _classCallCheck(this, IconStyle);
    var _this29 = _possibleConstructorReturn(this, Object.getPrototypeOf(IconStyle).call(this, id, targetId));
    _this29.color = color;
    _this29.scale = scale;
    _this29.icon = new Icon();
    _this29.icon.href = iconHref;
    _this29.heading = heading;
    return _this29
  }
  _createClass(IconStyle, [{
    key: "setHotSpot",
    value: function setHotSpot(x, y, xunits, yunits) {
      this.hotSpot = new Vec2(x,y,xunits,yunits);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(IconStyle.prototype), "toKml", this).call(this);
      kml += Kml.tag("scale", 'float', this.scale);
      kml += Kml.tag("heading", 'float', this.heading);
      kml += this.icon.toKml();
      kml += Kml.tagVec2("hotSpot", this.hotSpot);
      return Kml.tag("IconStyle", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return IconStyle
})(ColorStyle);
var IconStackStyle = (function(_SubStyle4) {
  _inherits(IconStackStyle, _SubStyle4);
  function IconStackStyle(id, targetId) {
    _classCallCheck(this, IconStackStyle);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(IconStackStyle).call(this, id, targetId))
  }
  _createClass(IconStackStyle, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(IconStackStyle.prototype), "toKml", this).call(this);
      return Kml.tag("gx:IconStackStyle", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return IconStackStyle
})(SubStyle);
var LabelStyle = (function(_ColorStyle4) {
  _inherits(LabelStyle, _ColorStyle4);
  function LabelStyle(color, scale, id, targetId) {
    _classCallCheck(this, LabelStyle);
    var _this31 = _possibleConstructorReturn(this, Object.getPrototypeOf(LabelStyle).call(this, id, targetId));
    _this31.color = color;
    _this31.scale = scale;
    return _this31
  }
  _createClass(LabelStyle, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(LabelStyle.prototype), "toKml", this).call(this);
      kml += Kml.tag("scale", 'float', this.scale);
      return Kml.tag("LabelStyle", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return LabelStyle
})(ColorStyle);
var Icon = (function(_KmlObject10) {
  _inherits(Icon, _KmlObject10);
  function Icon(href, id, targetId) {
    _classCallCheck(this, Icon);
    var _this32 = _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).call(this, id, targetId));
    _this32.href = href;
    return _this32
  }
  _createClass(Icon, [{
    key: "setXY",
    value: function setXY(x, y) {
      this.x = x;
      this.y = y;
      return this
    }
  }, {
    key: "setWH",
    value: function setWH(w, h) {
      this.w = w;
      this.h = h;
      return this
    }
  }, {
    key: "setRefresh",
    value: function setRefresh(refreshMode, refreshInterval) {
      this.refreshMode = refreshMode;
      this.refreshInterval = refreshInterval;
      return this
    }
  }, {
    key: "setViewRefresh",
    value: function setViewRefresh(viewRefreshMode, viewRefreshTime) {
      this.viewRefreshMode = viewRefreshMode;
      this.viewRefreshTime = viewRefreshTime;
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("href", 'uri', this.href);
      kml += Kml.tag("gx:x", 'int', this.x);
      kml += Kml.tag("gx:y", 'int', this.y);
      kml += Kml.tag("gx:w", 'int', this.w);
      kml += Kml.tag("gx:h", 'int', this.h);
      kml += Kml.tag("refreshMode", 'refreshModeEnum', this.refreshMode);
      kml += Kml.tag("refreshInterval", 'float', this.refreshInterval);
      kml += Kml.tag("viewRefreshMode", 'viewRefreshModeEnum', this.viewRefreshMode);
      kml += Kml.tag("viewRefreshTime", 'float', this.viewRefreshTime);
      kml += Kml.tag("viewBoundScale", 'float', this.viewBoundScale);
      kml += Kml.tag("viewFormat", 'string', this.viewFormat);
      kml += Kml.tag("httpQuery", 'string', this.httpQuery);
      return Kml.tag("Icon", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Icon
})(KmlObject);
var Overlay = (function(_Feature4) {
  _inherits(Overlay, _Feature4);
  function Overlay(name, iconHref, id, targetId) {
    _classCallCheck(this, Overlay);
    var _this33 = _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).call(this, name, id, targetId));
    _this33.icon = new Icon(iconHref);
    return _this33
  }
  _createClass(Overlay, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(Overlay.prototype), "toKml", this).call(this);
      kml += Kml.tag("color", 'color', this.color);
      kml += Kml.tag("drawOrder", 'int', this.drawOrder);
      kml += this.icon.toKml();
      return kml
    }
  }]);
  return Overlay
})(Feature);
var GroundOverlay = (function(_Overlay) {
  _inherits(GroundOverlay, _Overlay);
  function GroundOverlay(name, iconHref, id, targetId) {
    _classCallCheck(this, GroundOverlay);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(GroundOverlay).call(this, name, iconHref, id, targetId))
  }
  _createClass(GroundOverlay, [{
    key: "setLatLonBox",
    value: function setLatLonBox(north, south, east, west, rotation) {
      this.latLonBox = new LatLonBox(north,south,east,west,rotation);
      return this
    }
  }, {
    key: "setLatLonQuad",
    value: function setLatLonQuad(coordinates) {
      this.latLonQuad = new LatLonQuad(coordinates);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(GroundOverlay.prototype), "toKml", this).call(this);
      kml += Kml.tag("altitude", 'double', this.altitude);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      if (typeof this.latLonBox !== 'undefined' && this.latLonBox != null)
        kml += this.latLonBox.toKml();
      if (typeof this.latLonQuad !== 'undefined' && this.latLonQuad != null)
        kml += this.latLonQuad.toKml();
      return Kml.tag("GroundOverlay", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return GroundOverlay
})(Overlay);
var LatLonBox = (function() {
  function LatLonBox(north, south, east, west, rotation) {
    _classCallCheck(this, LatLonBox);
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
    this.rotation = rotation
  }
  _createClass(LatLonBox, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("north", 'angle90', this.north);
      kml += Kml.tag("south", 'angle90', this.south);
      kml += Kml.tag("east", 'angle180', this.east);
      kml += Kml.tag("west", 'angle180', this.west);
      kml += Kml.tag("rotation", 'angle180', this.rotation);
      return Kml.tag("LatLonBox", 'xml', kml)
    }
  }]);
  return LatLonBox
})();
var LatLonQuad = (function() {
  function LatLonQuad(coordinates) {
    _classCallCheck(this, LatLonQuad);
    this.coordinates = coordinates
  }
  _createClass(LatLonQuad, [{
    key: "toKml",
    value: function toKml() {
      var kml = "";
      if (this.coordinates.length !== 4)
        console.log("Warning: incorrect number of coordinates in LatLongQuad");
      kml = this.coordinates.reduce(function(p, c) {
        return p + coordinate.lng + "," + coordinate.lat + " "
      }, kml);
      return Kml.tag("gx:LatLonQuad", 'xml', Kml.tag("coordinates", 'coordinates', kml))
    }
  }]);
  return LatLonQuad
})();
var ScreenOverlay = (function(_Overlay2) {
  _inherits(ScreenOverlay, _Overlay2);
  function ScreenOverlay(name, iconHref, id, targetId) {
    _classCallCheck(this, ScreenOverlay);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOverlay).call(this, name, iconHref, id, targetId))
  }
  _createClass(ScreenOverlay, [{
    key: "setOverlayXY",
    value: function setOverlayXY(x, y, xunits, yunits) {
      this.overlayXY = new Vec2(x,y,xunits,yunits);
      return this
    }
  }, {
    key: "setScreenXY",
    value: function setScreenXY(x, y, xunits, yunits) {
      this.screenXY = new Vec2(x,y,xunits,yunits);
      return this
    }
  }, {
    key: "setRotationXY",
    value: function setRotationXY(x, y, xunits, yunits) {
      this.rotationXY = new Vec2(x,y,xunits,yunits);
      return this
    }
  }, {
    key: "setSize",
    value: function setSize(x, y, xunits, yunits) {
      this.size = new Vec2(x,y,xunits,yunits);
      return this
    }
  }, {
    key: "setRotation",
    value: function setRotation(rotation) {
      this.rotation = rotation;
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(ScreenOverlay.prototype), "toKml", this).call(this);
      kml += Kml.tagVec2("overlayXY", this.overlayXY);
      kml += Kml.tagVec2("screenXY", this.screenXY);
      kml += Kml.tagVec2("rotationXY", this.rotationXY);
      kml += Kml.tagVec2("size", this.size);
      kml += Kml.tag("rotation", 'float', this.rotation);
      return Kml.tag("ScreenOverlay", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return ScreenOverlay
})(Overlay);
var Vec2 = function Vec2(x, y, xunits, yunits) {
  _classCallCheck(this, Vec2);
  xunits = xunits || "fraction";
  yunits = yunits || "fraction";
  this.x = x;
  this.y = y;
  this.xunits = xunits;
  this.yunits = yunits
};
var PhotoOverlay = (function(_Overlay3) {
  _inherits(PhotoOverlay, _Overlay3);
  function PhotoOverlay(name, iconHref, abstractView, point, id, targetId) {
    _classCallCheck(this, PhotoOverlay);
    var _this36 = _possibleConstructorReturn(this, Object.getPrototypeOf(PhotoOverlay).call(this, name, iconHref, id, targetId));
    _this36.abstractView = abstractView;
    _this36.point = point;
    return _this36
  }
  _createClass(PhotoOverlay, [{
    key: "setViewVolume",
    value: function setViewVolume(near, leftFov, rightFov, bottomFov, topFov) {
      this.viewVolume = new ViewVolume(near,leftFov,rightFov,bottomFov,topFov);
      return this
    }
  }, {
    key: "setImagePyramid",
    value: function setImagePyramid(tileSize, maxWidth, maxHeight, gridOrigin) {
      this.imagePyramid = new ImagePyramid(tileSize,maxWidth,maxHeight,gridOrigin);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(PhotoOverlay.prototype), "toKml", this).call(this);
      kml += Kml.tag("rotation", 'angle180', this.rotation);
      if (!isEmpty(this.viewVolume)) {
        kml += this.viewVolume.toKml()
      }
      if (!isEmpty(this.imagePyramid)) {
        kml += this.imagePyramid.toKml()
      }
      if (!isEmpty(this.point)) {
        kml += this.point.toKml()
      }
      kml += Kml.tag("shape", 'shapeEnum', this.shape);
      return Kml.tag("PhotoOverlay", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return PhotoOverlay
})(Overlay);
var ViewVolume = (function() {
  function ViewVolume(near, leftFov, rightFov, bottomFov, topFov) {
    _classCallCheck(this, ViewVolume);
    this.near = near;
    this.leftFov = leftFov;
    this.rightFov = rightFov;
    this.bottomFov = bottomFov;
    this.topFov = topFov
  }
  _createClass(ViewVolume, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("leftFov", 'angle180', this.leftFov);
      kml += Kml.tag("rightFov", 'angle180', this.rightFov);
      kml += Kml.tag("bottomFov", 'angle90', this.bottomFov);
      kml += Kml.tag("topFov", 'angle90', this.topFov);
      return Kml.tag("ViewVolume", 'xml', kml)
    }
  }]);
  return ViewVolume
})();
var ImagePyramid = (function() {
  function ImagePyramid(tileSize, maxWidth, maxHeight, gridOrigin) {
    _classCallCheck(this, ImagePyramid);
    this.tileSize = tileSize;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.gridOrigin = gridOrigin
  }
  _createClass(ImagePyramid, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("tileSize", 'int', this.tileSize);
      kml += Kml.tag("maxWidth", 'int', this.maxWidth);
      kml += Kml.tag("maxHeight", 'int', this.maxHeight);
      kml += Kml.tag("gridOrigin", 'gridOrigin', this.gridOrigin);
      return Kml.tag("ImagePyramid", 'xml', kml)
    }
  }]);
  return ImagePyramid
})();
var AbstractView = (function(_KmlObject11) {
  _inherits(AbstractView, _KmlObject11);
  function AbstractView(id, targetId) {
    _classCallCheck(this, AbstractView);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractView).call(this, id, targetId))
  }
  _createClass(AbstractView, [{
    key: "setTimeStamp",
    value: function setTimeStamp(when) {
      this.timePrimitive = new TimePrimitive('timeStamp',when);
      return this
    }
  }, {
    key: "setTimeSpan",
    value: function setTimeSpan(begin, end) {
      this.timePrimitive = new TimePrimitive('timeSpan',begin,end);
      return this
    }
  }, {
    key: "addViewerOption",
    value: function addViewerOption(name, enabled) {
      enabled = enabled || "1";
      if (typeof this.viewerOptions === 'undefined') {
        this.viewerOptions = new ViewerOptions()
      }
      this.viewerOptions.options.push({
        name: name,
        enabled: enabled
      })
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = "";
      if (typeof this.timePrimitive !== 'undefined' && this.timePrimitive != null && this.timePrimitive != "") {
        kml += this.timePrimitive.toKml()
      }
      if (typeof this.viewerOptions !== 'undefined') {
        kml += this.viewerOptions.toKml()
      }
      return kml
    }
  }]);
  return AbstractView
})(KmlObject);
var ViewerOptions = (function() {
  function ViewerOptions() {
    _classCallCheck(this, ViewerOptions);
    this.options = []
  }
  _createClass(ViewerOptions, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.options.reduce(function(p, c) {
        p + Kml.tag("gx:option", 'string', "", {
          name: this.options[i].name,
          enabled: this.options[i].enabled
        }, true),
            ""
      });
      return Kml.tag("gx:ViewerOptions", 'xml', kml)
    }
  }]);
  return ViewerOptions
})();
var TimePrimitive = (function() {
  function TimePrimitive(type, first, second) {
    _classCallCheck(this, TimePrimitive);
    if (type === 'timeStamp') {
      this.when = TimePrimitive.convertDate(first)
    }
    if (type === 'timeSpan') {
      this.begin = TimePrimitive.convertDate(first);
      this.end = TimePrimitive.convertDate(second)
    }
  }
  _createClass(TimePrimitive, [{
    key: "toKml",
    value: function toKml() {
      if (typeof this.when !== 'undefined' && this.when !== null && this.when !== "") {
        var kml = Kml.tag("when", 'dateTime', this.when);
        return Kml.tag("gx:TimeStamp", 'xml', kml)
      } else if (typeof this.begin !== 'undefined' && this.begin !== null && this.begin !== "" || typeof this.end !== 'undefined' && this.end !== null && this.end !== "") {
        var kml = Kml.tag("begin", 'dateTime', this.begin);
        kml += Kml.tag("end", 'dateTime', this.end);
        return Kml.tag("gx:TimeSpan", 'xml', kml)
      }
      console.log("Warning: Empty time primitive.");
      return ""
    }
  }], [{
    key: "convertDate",
    value: function convertDate(date) {
      if (typeof date === 'string') {
        return date
      } else if (date instanceof Date) {
        return date.toISOString()
      }
      console.log("Warning: invalid TimePrimitive");
      return ""
    }
  }]);
  return TimePrimitive
})();
var Camera = (function(_AbstractView) {
  _inherits(Camera, _AbstractView);
  function Camera(longitude, latitude, altitude, heading, tilt, roll, altitudeMode, id, targetId) {
    _classCallCheck(this, Camera);
    var _this38 = _possibleConstructorReturn(this, Object.getPrototypeOf(Camera).call(this, id, targetId));
    _this38.longitude = longitude;
    _this38.latitude = latitude;
    _this38.altitude = altitude;
    _this38.heading = heading;
    _this38.tilt = tilt;
    _this38.roll = roll;
    _this38.altitudeMode = altitudeMode;
    return _this38
  }
  _createClass(Camera, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(Camera.prototype), "toKml", this).call(this);
      kml += Kml.tag("longitude", 'angle180', this.longitude);
      kml += Kml.tag("latitude", 'angle90', this.latitude);
      kml += Kml.tag("altitude", 'double', this.altitude);
      kml += Kml.tag("heading", 'angle360', this.heading);
      kml += Kml.tag("tilt", 'anglepos180', this.tilt);
      kml += Kml.tag("roll", 'angle180', this.roll);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      return Kml.tag("Camera", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Camera
})(AbstractView);
var LookAt = (function(_AbstractView2) {
  _inherits(LookAt, _AbstractView2);
  function LookAt(longitude, latitude, altitude, heading, tilt, range, altitudeMode, id, targetId) {
    _classCallCheck(this, LookAt);
    var _this39 = _possibleConstructorReturn(this, Object.getPrototypeOf(LookAt).call(this, id, targetId));
    _this39.longitude = longitude;
    _this39.latitude = latitude;
    _this39.altitude = altitude;
    _this39.heading = heading;
    _this39.tilt = tilt;
    _this39.range = range;
    _this39.altitudeMode = altitudeMode;
    return _this39
  }
  _createClass(LookAt, [{
    key: "toKml",
    value: function toKml() {
      var kml = _get(Object.getPrototypeOf(LookAt.prototype), "toKml", this).call(this);
      kml += Kml.tag("longitude", 'angle180', this.longitude);
      kml += Kml.tag("latitude", 'angle90', this.latitude);
      kml += Kml.tag("altitude", 'double', this.altitude);
      kml += Kml.tag("heading", 'angle360', this.heading);
      kml += Kml.tag("tilt", 'anglepos90', this.tilt);
      kml += Kml.tag("range", 'double', this.range);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      return Kml.tag("LookAt", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return LookAt
})(AbstractView);
var Tour = (function(_Feature5) {
  _inherits(Tour, _Feature5);
  function Tour(name, id, targetId) {
    _classCallCheck(this, Tour);
    var _this40 = _possibleConstructorReturn(this, Object.getPrototypeOf(Tour).call(this, name, id, targetId));
    _this40.playlist = new Playlist();
    return _this40
  }
  _createClass(Tour, [{
    key: "addTourPrimitive",
    value: function addTourPrimitive(tourPrimitive) {
      this.playlist.tourPrimitives.push(tourPrimitive);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("name", 'string', this.name);
      kml += Kml.tag("description", 'html', this.description);
      kml += this.playlist.toKml();
      return Kml.tag("gx:Tour", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Tour
})(Feature);
var Playlist = (function(_KmlObject12) {
  _inherits(Playlist, _KmlObject12);
  function Playlist(id, targetId) {
    _classCallCheck(this, Playlist);
    var _this41 = _possibleConstructorReturn(this, Object.getPrototypeOf(Playlist).call(this, id, targetId));
    _this41.tourPrimitives = [];
    return _this41
  }
  _createClass(Playlist, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.tourPrimitives.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("gx:Playlist", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return Playlist
})(KmlObject);
var TourPrimitive = (function(_KmlObject13) {
  _inherits(TourPrimitive, _KmlObject13);
  function TourPrimitive(id, targetId) {
    _classCallCheck(this, TourPrimitive);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(TourPrimitive).call(this, id, targetId))
  }
  return TourPrimitive
})(KmlObject);
var AnimatedUpdate = (function(_TourPrimitive) {
  _inherits(AnimatedUpdate, _TourPrimitive);
  function AnimatedUpdate(duration, delayedStart, id, targetId) {
    _classCallCheck(this, AnimatedUpdate);
    var _this43 = _possibleConstructorReturn(this, Object.getPrototypeOf(AnimatedUpdate).call(this, id, targetId));
    _this43.duration = duration;
    _this43.delayedStart = delayedStart;
    _this43.update = new Update();
    return _this43
  }
  _createClass(AnimatedUpdate, [{
    key: "addChange",
    value: function addChange(change) {
      if (isEmpty(this.update.change))
        this.update.change = new Change();
      this.update.change.changes.push(change);
      return this
    }
  }, {
    key: "addCreate",
    value: function addCreate(create) {
      if (isEmpty(this.update.create))
        this.update.create = new Create();
      this.update.create.creates.push(create);
      return this
    }
  }, {
    key: "addDelete",
    value: function addDelete(_delete) {
      if (isEmpty(this.update.delete))
        this.update.delete = new Delete();
      this.update.delete.deletes.push(_delete);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("gx:duration", 'double', this.duration);
      kml += Kml.tag("gx:delayedStart", 'double', this.delayedStart);
      kml += this.update.toKml();
      return Kml.tag("gx:AnimatedUpdate", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      }, true)
    }
  }]);
  return AnimatedUpdate
})(TourPrimitive);
var Update = (function() {
  function Update() {
    _classCallCheck(this, Update);
    this.targetHref = " "
  }
  _createClass(Update, [{
    key: "toKml",
    value: function toKml() {
      this.targetHref = this.targetHref || " ";
      var kml = Kml.tag("targetHref", 'url', this.targetHref);
      if (!isEmpty(this.change))
        kml += this.change.toKml();
      if (!isEmpty(this.create))
        kml += this.create.toKml();
      if (!isEmpty(this.delete))
        kml += this.delete.toKml();
      return Kml.tag("Update", 'xml', kml)
    }
  }]);
  return Update
})();
var Change = (function() {
  function Change() {
    _classCallCheck(this, Change);
    this.changes = []
  }
  _createClass(Change, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.changes.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("Change", 'xml', kml)
    }
  }]);
  return Change
})();
var Create = (function() {
  function Create() {
    _classCallCheck(this, Create);
    this.creates = []
  }
  _createClass(Create, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.creates.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("Create", 'xml', kml)
    }
  }]);
  return Create
})();
var Delete = (function() {
  function Delete() {
    _classCallCheck(this, Delete);
    this.deletes = []
  }
  _createClass(Delete, [{
    key: "toKml",
    value: function toKml() {
      var kml = this.deletes.reduce(function(p, c) {
        return p + c.toKml()
      }, "");
      return Kml.tag("Delete", 'xml', kml)
    }
  }]);
  return Delete
})();
var FlyTo = (function(_TourPrimitive2) {
  _inherits(FlyTo, _TourPrimitive2);
  function FlyTo(duration, flyToMode, abstractView, id, targetId) {
    _classCallCheck(this, FlyTo);
    var _this44 = _possibleConstructorReturn(this, Object.getPrototypeOf(FlyTo).call(this, id));
    _this44.duration = duration;
    _this44.flyToMode = flyToMode;
    _this44.abstractView = abstractView;
    return _this44
  }
  _createClass(FlyTo, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("gx:duration", 'double', this.duration);
      kml += Kml.tag("gx:flyToMode", 'flyToModeEnum', this.flyToMode);
      kml += this.abstractView.toKml();
      return Kml.tag("gx:FlyTo", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return FlyTo
})(TourPrimitive);
var SoundCue = (function(_TourPrimitive3) {
  _inherits(SoundCue, _TourPrimitive3);
  function SoundCue(href, delayedStart, id, targetId) {
    _classCallCheck(this, SoundCue);
    var _this45 = _possibleConstructorReturn(this, Object.getPrototypeOf(SoundCue).call(this, id));
    _this45.href = href;
    _this45.delayedStart = delayedStart;
    return _this45
  }
  _createClass(SoundCue, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("href", 'uri', this.href);
      kml += Kml.tag("gx:delayedStart", 'double', this.delayedStart);
      return Kml.tag("gx:SoundCue", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return SoundCue
})(TourPrimitive);
var TourControl = (function(_TourPrimitive4) {
  _inherits(TourControl, _TourPrimitive4);
  function TourControl(id, targetId) {
    _classCallCheck(this, TourControl);
    var _this46 = _possibleConstructorReturn(this, Object.getPrototypeOf(TourControl).call(this, id));
    _this46.playMode = "pause";
    return _this46
  }
  _createClass(TourControl, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("gx:playMode", 'playModeEnum', this.playMode);
      return Kml.tag("gx:TourControl", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return TourControl
})(TourPrimitive);
var Wait = (function(_TourPrimitive5) {
  _inherits(Wait, _TourPrimitive5);
  function Wait(duration, id, targetId) {
    _classCallCheck(this, Wait);
    var _this47 = _possibleConstructorReturn(this, Object.getPrototypeOf(Wait).call(this, id, targetId));
    _this47.duration = duration;
    return _this47
  }
  _createClass(Wait, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("gx:duration", 'double', this.duration);
      return Kml.tag("gx:Wait", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return Wait
})(TourPrimitive);
var Region = (function(_KmlObject14) {
  _inherits(Region, _KmlObject14);
  function Region(id, targetId) {
    _classCallCheck(this, Region);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Region).call(this, id, targetId))
  }
  _createClass(Region, [{
    key: "setLatLonAltBox",
    value: function setLatLonAltBox(north, south, east, west, minAltitude, maxAltitude, altitudeMode) {
      this.latLonAltBox = new LatLonAltBox(north,south,east,west,minAltitude,maxAltitude,altitudeMode);
      return this
    }
  }, {
    key: "setLod",
    value: function setLod(minLodPixels, maxLodPixels, minFadeExtent, maxFadeExtent) {
      this.lod = new Lod(minLodPixels,maxLodPixels,minFadeExtent,maxFadeExtent);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = "";
      if (!isEmpty(this.latLonAltBox)) {
        kml += this.latLonAltBox.toKml()
      }
      if (!isEmpty(this.lod)) {
        kml += this.lod.toKml()
      }
      return Kml.tag("Region", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return Region
})(KmlObject);
var LatLonAltBox = (function() {
  function LatLonAltBox(north, south, east, west, minAltitude, maxAltitude, altitudeMode) {
    _classCallCheck(this, LatLonAltBox);
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
    this.minAltitude = minAltitude;
    this.maxAltitude = maxAltitude;
    this.altitudeMode = altitudeMode
  }
  _createClass(LatLonAltBox, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("north", 'angle90', this.north);
      kml += Kml.tag("south", 'angle90', this.south);
      kml += Kml.tag("east", 'angle180', this.east);
      kml += Kml.tag("west", 'angle180', this.west);
      kml += Kml.tag("minAltitude", 'float', this.minAltitude);
      kml += Kml.tag("maxAltitude", 'float', this.maxAltitude);
      kml += Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      return Kml.tag("LatLonAltBox", 'xml', kml)
    }
  }]);
  return LatLonAltBox
})();
var Lod = (function() {
  function Lod(minLodPixels, maxLodPixels, minFadeExtent, maxFadeExtent) {
    _classCallCheck(this, Lod);
    this.minLodPixels = minLodPixels;
    this.maxLodPixels = maxLodPixels;
    this.minFadeExtent = minFadeExtent;
    this.maxFadeExtent = maxFadeExtent
  }
  _createClass(Lod, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("minLodPixels", 'float', this.minLodPixels);
      kml += Kml.tag("maxLodPixels", 'float', this.maxLodPixels);
      kml += Kml.tag("minFadeExtent", 'float', this.minFadeExtent);
      kml += Kml.tag("maxFadeExtent", 'float', this.maxFadeExtent);
      return Kml.tag("Lod", 'xml', kml)
    }
  }]);
  return Lod
})();
var Track = (function(_KmlObject15) {
  _inherits(Track, _KmlObject15);
  function Track(id, targetId) {
    _classCallCheck(this, Track);
    var _this49 = _possibleConstructorReturn(this, Object.getPrototypeOf(Track).call(this, id, targetId));
    _this49.whens = [];
    _this49.coords = [];
    _this49.angles = [];
    return _this49
  }
  _createClass(Track, [{
    key: "addWhen",
    value: function addWhen(when) {
      this.whens.push(TimePrimitive.convertDate(when));
      return this
    }
  }, {
    key: "addCoord",
    value: function addCoord(coord) {
      this.coords.push(coord);
      return this
    }
  }, {
    key: "addAngle",
    value: function addAngle(heading, tilt, roll) {
      var angle = {
        heading: heading,
        tilt: tilt,
        roll: roll
      };
      this.angles.push(angle);
      return this
    }
  }, {
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      kml = this.whens.reduce(function(p, c) {
        return p + Kml.tag("when", 'dateTime', c)
      }, kml);
      kml = this.coords.reduce(function(p, c) {
        return p + Kml.tag("gx:coord", 'string', c.lng + " " + c.lat + " " + c.alt)
      }, kml);
      kml = this.angles.reduce(function(p, c) {
        return p + Kml.tag("gx:angles", 'string', c.heading + " " + c.tilt + " " + c.roll)
      }, kml);
      if (!isEmpty(this.model))
        kml += this.model.toKml();
      if (!isEmpty(this.extendedData))
        kml += this.extendedData.toKml();
      return Kml.tag("Track", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return Track
})(KmlObject);
var MultiTrack = (function(_Geometry7) {
  _inherits(MultiTrack, _Geometry7);
  function MultiTrack(id, targetId) {
    _classCallCheck(this, MultiTrack);
    var _this50 = _possibleConstructorReturn(this, Object.getPrototypeOf(MultiTrack).call(this, id, targetId));
    _this50.tracks = [];
    return _this50
  }
  _createClass(MultiTrack, [{
    key: "toKml",
    value: function toKml() {
      var kml = Kml.tag("altitudeMode", 'altitudeModeEnum', this.altitudeMode);
      kml += Kml.tag("gx:interpolate", 'boolean', this.interpolate);
      kml = this.tracks.reduce(function(p, c) {
        return p + c.toKml()
      }, kml);
      return Kml.tag("MultiTrack", 'xml', kml, {
        id: this.id,
        targetId: this.targetId
      })
    }
  }]);
  return MultiTrack
})(Geometry);
var Coordinate = (function() {
  function Coordinate(lat, lng, alt) {
    _classCallCheck(this, Coordinate);
    if (!isEmpty(lat) && !isNaN(lat)) {
      this.lat = parseFloat(lat)
    } else {
      this.lat = 0
    }
    if (!isEmpty(lng) && !isNaN(lng)) {
      this.lng = parseFloat(lng)
    } else {
      this.lng = 0
    }
    if (!isEmpty(alt) && !isNaN(alt)) {
      this.alt = parseFloat(alt)
    } else {
      this.alt = 0
    }
  }
  _createClass(Coordinate, [{
    key: "toKml",
    value: function toKml() {
      if (isEmpty(this.alt)) {
        this.alt = 0
      }
      if (compressLatLngs) {
        return +this.lng.toFixed(compressionLength) + "," + +this.lat.toFixed(compressionLength) + "," + (altitude_decimals ? +this.alt.toFixed(compressionLength) : this.alt.toFixed()) + " "
      } else {
        return this.lng + "," + this.lat + "," + (altitude_decimals ? this.alt : this.alt.toFixed()) + " "
      }
    }
  }, {
    key: "clone",
    value: function clone(p2) {
      this.lat = p2.lat;
      this.lng = p2.lng;
      this.alt = p2.alt
    }
  }, {
    key: "antipode",
    value: function antipode() {
      return new Coordinate(-this.lat,this.lng + 180,this.alt).normalize()
    }
  }, {
    key: "normalize",
    value: function normalize() {
      this.lat = Kml.normalizeAngle(this.lat, -90, 90);
      this.lng = Kml.normalizeAngle(this.lng, -180, 180);
      return this
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(p2) {
      var geod = GeographicLib.Geodesic.WGS84;
      var r = geod.Inverse(this.lat, this.lng, p2.lat, p2.lng);
      return r.s12
    }
  }, {
    key: "bearingTo",
    value: function bearingTo(p2) {
      var Geodesic = GeographicLib.Geodesic;
      var geod = Geodesic.WGS84;
      var r = geod.Inverse(this.lat, this.lng, p2.lat, p2.lng, Geodesic.AZIMUTH);
      return Kml.normalizeAngle(r.azi1, 0, 360)
    }
  }, {
    key: "destinationPoint",
    value: function destinationPoint(azimuth, distance) {
      var Geodesic = GeographicLib.Geodesic;
      var geod = Geodesic.WGS84;
      var r = geod.Direct(this.lat, this.lng, azimuth, distance, Geodesic.LATITUDE | Geodesic.LONGITUDE);
      return new Coordinate(r.lat2,r.lon2)
    }
  }, {
    key: "crossTrackIntercept",
    value: function crossTrackIntercept(segment) {
      return _crossTrackIntercept(this, segment)
    }
  }, {
    key: "distanceToGreatCirclePrecision",
    value: function distanceToGreatCirclePrecision(p1, p2) {
      return this.distanceTo(_crossTrackIntercept(this, [p1, p2]))
    }
  }, {
    key: "distanceToGreatCircle",
    value: function distanceToGreatCircle(p1, p2) {
      return Math.abs(this.distanceToGreatCircleSigned(p1, p2))
    }
  }, {
    key: "distanceToGreatCircleSigned",
    value: function distanceToGreatCircleSigned(p1, p2) {
      var R = 6378137;
      var d13 = p1.distanceTo(this);
      var theta13 = p1.bearingTo(this).toRadians();
      var theta12 = p1.bearingTo(p2).toRadians();
      var dXt = Math.asin(Math.sin(d13 / R) * Math.sin(theta13 - theta12)) * R;
      return dXt
    }
  }, {
    key: "equals",
    value: function equals(p2) {
      return this.lat === p2.lat && this.lng === p2.lng && this.alt === p2.alt
    }
  }, {
    key: "near",
    value: function near(p2, sensitivity) {
      return this.distanceTo(p2) <= sensitivity
    }
  }, {
    key: "isOnGreatCircleSegment",
    value: function isOnGreatCircleSegment(p1, p2) {
      var s12 = p1.distanceTo(p2);
      var s13 = p1.distanceTo(this);
      var s23 = p2.distanceTo(this);
      return s13 * s13 < s12 * s12 + s23 * s23 && s23 * s23 < s12 * s12 + s13 * s13
    }
  }, {
    key: "findClosestPoint",
    value: function findClosestPoint(points) {
      var _this51 = this, _Math;
      var distances = points.map(function(point) {
        return _this51.distanceTo(point)
      });
      var minDistance = (_Math = Math).min.apply(_Math, _toConsumableArray(distances));
      var i = distances.findIndex(function(distance) {
        return distance === minDistance
      });
      return {
        i: i,
        point: points[i],
        distance: minDistance
      }
    }
  }, {
    key: "findClosestSegment",
    value: function findClosestSegment(points) {
      var _this52 = this, _Math2;
      var segments = Coordinate.toSegments(points);
      var validSegments = segments.filter(function(segment) {
        return _this52.isOnGreatCircleSegment(segment.p1, segment.p2)
      });
      if (validSegments.length === 0) {
        return {
          i: -1
        }
      }
      var distances = validSegments.map(function(segment) {
        return _this52.distanceToGreatCircle(segment.p1, segment.p2)
      });
      var minDistance = (_Math2 = Math).min.apply(_Math2, _toConsumableArray(distances));
      var closestSegment = validSegments[distances.findIndex(function(distance) {
        return distance === minDistance
      })];
      var i = segments.findIndex(function(segment) {
        return segment.p1.equals(closestSegment.p1) && segment.p2.equals(closestSegment.p2)
      });
      return {
        i: i,
        segment: closestSegment,
        distance: minDistance
      }
    }
  }, {
    key: "findClosestPointOrSegment",
    value: function findClosestPointOrSegment(points) {
      var closestPoint = this.findClosestPoint(points);
      var closestSegment = this.findClosestSegment(points);
      if (closestSegment.i === -1 || closestSegment.distance > closestPoint.distance / 1.1) {
        closestPoint.matchType = "point";
        return closestPoint
      } else {
        closestSegment.matchType = "segment";
        return closestSegment
      }
    }
  }, {
    key: "createArcTo",
    value: function createArcTo(p2, divisions, altitudeMethod, maxAlt) {
      var arc = [];
      arc.push(this);
      switch (altitudeMethod) {
        case "fixed":
          break;
        case "automatic":
        default:
          maxAlt = Math.sqrt(this.distanceTo(p2)) * 40;
          break;
      }
      for (var _i = 1; _i < divisions; _i += 1) {
        var fraction = _i / divisions;
        var point = this.intermediatePoint(p2, fraction);
        point.alt = this.intermediateAltitude(p2, fraction, maxAlt);
        arc.push(point)
      }
      arc.push(p2);
      return arc
    }
  }, {
    key: "isOnSegment",
    value: function isOnSegment(segment) {
      var latExtent = segment.maxLat - segment.minLat;
      var lngExtent = segment.maxLng - segment.minLng;
      if (latExtent > lngExtent) {
        return this.lat <= segment.maxLat && this.lat >= segment.minLat
      } else {
        return this.lng <= segment.maxLng && this.lng >= segment.minLng
      }
    }
  }, {
    key: "intermediateAltitude",
    value: function intermediateAltitude(p2, f, maxAlt) {
      return Math.round(Math.sin(f * Math.PI) * maxAlt + Math.abs(this.alt - p2.alt) * (this.alt <= p2.alt ? f : 1 - f) + Math.min(this.alt, p2.alt))
    }
  }, {
    key: "isInternalTo",
    value: function isInternalTo(points, segments) {
      var _this53 = this;
      if (typeof points.find(function(p) {
            return p.lat === _this53.lat && p.lng === _this53.lng
          }) !== 'undefined') {
        return true
      }
      segments = segments || Coordinate.toSegments(points);
      var toNP = new Segment(this,new Coordinate(90,this.lng));
      var iterceptions = segments.reduce(function(prev, curr) {
        return prev + (toNP.intercepts(curr) || curr.intercepts(toNP))
      }, 0);
      return iterceptions % 2 !== 0
    }
  }, {
    key: "intermediatePoint",
    value: function intermediatePoint(p2, f) {
      var phi1 = this.lat.toRadians();
      var lambda1 = this.lng.toRadians();
      var phi2 = p2.lat.toRadians();
      var lambda2 = p2.lng.toRadians();
      var deltaphi = (p2.lat - this.lat).toRadians();
      var deltalambda = (p2.lng - this.lng).toRadians();
      var alpha = Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltalambda / 2) * Math.sin(deltalambda / 2);
      var delta = 2 * Math.atan2(Math.sqrt(alpha), Math.sqrt(1 - alpha));
      var a = Math.sin((1 - f) * delta) / Math.sin(delta);
      var b = Math.sin(f * delta) / Math.sin(delta);
      var x = a * Math.cos(phi1) * Math.cos(lambda1) + b * Math.cos(phi2) * Math.cos(lambda2);
      var y = a * Math.cos(phi1) * Math.sin(lambda1) + b * Math.cos(phi2) * Math.sin(lambda2);
      var z = a * Math.sin(phi1) + b * Math.sin(phi2);
      var latRad = Math.atan2(z, Math.sqrt(x * x + y * y));
      var lngRad = Math.atan2(y, x);
      return new Coordinate(latRad.toDegrees(),lngRad.toDegrees())
    }
  }, {
    key: "bearingToOld",
    value: function bearingToOld(p2) {
      var phi1 = this.lat.toRadians();
      var lambda1 = this.lng.toRadians();
      var phi2 = p2.lat.toRadians();
      var lambda2 = p2.lng.toRadians();
      var y = Math.sin(lambda2 - lambda1) * Math.cos(phi2);
      var x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lambda2 - lambda1);
      var bearing = Math.atan2(y, x).toDegrees();
      return (bearing + 360) % 360
    }
  }], [{
    key: "toSegments",
    value: function toSegments(coordinates) {
      return coordinates.map(function(coordinate, i) {
        return new Segment(coordinate,coordinates[i < coordinates.length - 1 ? i + 1 : 0])
      })
    }
  }]);
  return Coordinate
})();
var Segment = (function() {
  function Segment(p1, p2) {
    _classCallCheck(this, Segment);
    p1.normalize();
    p2.normalize();
    this.p1 = p1;
    this.p2 = p2
  }
  _createClass(Segment, [{
    key: "intermediatePoint",
    value: function intermediatePoint(fraction) {
      return this.p1.destinationPoint(this.initialBearing, this.distance * fraction)
    }
  }, {
    key: "intercepts",
    value: function intercepts(s) {
      if (this.minLat > s.maxLat || this.maxLat < s.minLat || this.minLng > s.maxLng || this.maxLng < s.minLng) {
        return false
      }
      var is = this.findIntersection(s);
      return is.isOnSegment(this) && is.isOnSegment(s)
    }
  }, {
    key: "findIntersection",
    value: function findIntersection(s) {
      return _findIntersection(this, s)
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.p1, this.p2]
    }
  }, {
    key: "crossesAntiMeridien",
    get: function get() {
      if (typeof this._crossesAntiMeridien === 'undefined') {
        this._crossesAntiMeridien = Math.abs(this.p1.lng - this.p2.lng) > 180
      }
      return this._crossesAntiMeridien
    }
  }, {
    key: "minLat",
    get: function get() {
      if (typeof this._minLat === 'undefined') {
        this._minLat = Math.min(this.p1.lat, this.p2.lat)
      }
      return this._minLat
    }
  }, {
    key: "maxLat",
    get: function get() {
      if (typeof this._maxLat === 'undefined') {
        this._maxLat = Math.max(this.p1.lat, this.p2.lat)
      }
      return this._maxLat
    }
  }, {
    key: "minLng",
    get: function get() {
      if (typeof this._minLng === 'undefined') {
        this._minLng = this.crossesAntiMeridien ? Math.max(this.p1.lng, this.p2.lng) : Math.min(this.p1.lng, this.p2.lng)
      }
      return this._minLng
    }
  }, {
    key: "maxLng",
    get: function get() {
      if (typeof this._maxLng === 'undefined') {
        this._maxLng = this.crossesAntiMeridien ? Math.min(this.p1.lng, this.p2.lng) : Math.max(this.p1.lng, this.p2.lng)
      }
      return this._maxLng
    }
  }, {
    key: "distance",
    get: function get() {
      if (typeof this._distance === 'undefined') {
        this._distance = this.p1.distanceTo(this.p2)
      }
      return this._distance
    }
  }, {
    key: "initialBearing",
    get: function get() {
      if (typeof this._initialBearing === 'undefined') {
        this._initialBearing = this.p1.bearingTo(this.p2)
      }
      return this._initialBearing
    }
  }, {
    key: "finalBearing",
    get: function get() {
      if (typeof this._finalBearing === 'undefined') {
        this._finalBearing = Kml.normalizeAngle(this.p2.bearingTo(this.p1) + 180, 0, 360)
      }
      return this._finalBearing
    }
  }]);
  return Segment
})();
var Poly = (function() {
  function Poly(points) {
    _classCallCheck(this, Poly);
    this.points = points
  }
  _createClass(Poly, [{
    key: "isSameRegion",
    value: function isSameRegion(poly2) {
      return !(this.minLat > poly2.maxLat || this.maxLat < poly2.minLat || this.minLng > poly2.maxLng || this.maxLng < poly2.minLng)
    }
  }, {
    key: "isSameRegion",
    value: function isSameRegion(point) {
      return !(this.minLat > point.lat || this.maxLat < point.lat || this.minLng > point.lng || this.maxLng < point.lng)
    }
  }, {
    key: "crossesAntiMeridien",
    get: function get() {
      if (typeof this._crossesAntiMeridien === 'undefined') {
        var segments = Coordinate.toSegments(this.points);
        this._crossesAntiMeridien = typeof segments.find(function(segment) {
              return segment.crossesAntiMeridien
            }) !== 'undefined'
      }
      return this._crossesAntiMeridien
    }
  }, {
    key: "minLat",
    get: function get() {
      if (typeof this._minLat === 'undefined') {
        var _Math3;
        this._minLat = (_Math3 = Math).min.apply(_Math3, _toConsumableArray(this.points.map(function(point) {
          return point.lat
        })))
      }
      return this._minLat
    }
  }, {
    key: "maxLat",
    get: function get() {
      if (typeof this._maxLat === 'undefined') {
        var _Math4;
        this._maxLat = (_Math4 = Math).max.apply(_Math4, _toConsumableArray(this.points.map(function(point) {
          return point.lat
        })))
      }
      return this._maxLat
    }
  }, {
    key: "minLng",
    get: function get() {
      if (typeof this._minLng === 'undefined') {
        var _Math5, _Math6;
        this._minLng = this.crossesAntiMeridien ? (_Math5 = Math).max.apply(_Math5, _toConsumableArray(this.points.map(function(point) {
              return point.lng
            }))) : (_Math6 = Math).min.apply(_Math6, _toConsumableArray(this.points.map(function(point) {
              return point.lng
            })))
      }
      return this._minLng
    }
  }, {
    key: "maxLng",
    get: function get() {
      if (typeof this._maxLng === 'undefined') {
        var _Math7, _Math8;
        this._maxLng = this.crossesAntiMeridien ? (_Math7 = Math).min.apply(_Math7, _toConsumableArray(this.points.map(function(point) {
              return point.lng
            }))) : (_Math8 = Math).max.apply(_Math8, _toConsumableArray(this.points.map(function(point) {
              return point.lng
            })))
      }
      return this._maxLng
    }
  }]);
  return Poly
})();
if (Number.prototype.toRadians === undefined) {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180
  }
}
if (Number.prototype.toDegrees === undefined) {
  Number.prototype.toDegrees = function() {
    return this * 180 / Math.PI
  }
}
function download(filename, text) {
  var blob = new Blob([text],{
    type: "text/plain"
  });
  saveAs(blob, filename)
}
function readAsKml(fileControl, complete) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {} else
    alert('The File APIs are not fully supported in this browser.');
  var files = fileControl.files;
  if (files.length === 0) {
    alert("Please select a file");
    return
  }
  var coordsArrays = [];
  coordsArrays.filenames = "";
  var _loop = function _loop(_j, f, _i2) {
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        coordsArrays.filenames += theFile.name.slice(0, -4) + " ";
        if (theFile.name.slice(-4) === ".kml")
          readKml(e.target.result, coordsArrays, theFile.name);
        else if (theFile.name.slice(-4) === ".kmz") {
          var zip = new JSZip(e.target.result);
          jQuery.each(zip.files, function(index, zipEntry) {
            if (zipEntry.name.slice(-4) === ".kml")
              readKml(zipEntry.asText(), coordsArrays, zipEntry.name);
            else
              console.log("Non-KML file found in KMZ:" + zipEntry.name)
          })
        }
        _j++;
        if (_j === files.length)
          complete(coordsArrays)
      }
    })(f);
    if (f.name.slice(-4) === ".kml")
      reader.readAsText(f, "UTF-8");
    else if (f.name.slice(-4) === ".kmz")
      reader.readAsArrayBuffer(f);
    else
      alert("Unknown file type:" + f.name);
    j = _j
  };
  for (var _i2 = 0, j = 0, f; f = files[_i2]; _i2 += 1) {
    _loop(j, f, _i2)
  }
}
function readKml(kmlString, coordsArrays, filename) {
  if (document.getElementById('outputErrors') != null && document.getElementById('outputErrors').checked)
    correctedString = kmlString;
  var xmlDoc = jQuery.parseXML(kmlString);
  var xml = jQuery(xmlDoc);
  xml.find('Placemark').each(function(index) {
    var name = jQuery(this).find("name").text();
    jQuery(this).find('Point').each(function(index) {
      coordsArrays.push(coordsStringToArray(jQuery(this).find('coordinates').text(), "Point", name, filename))
    });
    jQuery(this).find('Polygon').each(function(index) {
      coordsArrays.push(coordsStringToArray(jQuery(this).find('coordinates').text(), "Polygon", name, filename))
    });
    jQuery(this).find('LineString').each(function(index) {
      coordsArrays.push(coordsStringToArray(jQuery(this).find('coordinates').text(), "LineString", name, filename))
    })
  })
}
function coordsStringToArray(polyCoordsString, type, name, filename) {
  var coords = (" " + polyCoordsString).match(/\S+/g);
  if (coords === null) {
    return []
  }
  coords = coords.map(function(coordSet) {
    return coordSet.split(",")
  });
  coords = coords.filter(function(coord) {
    return !isEmpty(coord[0]) && !isNaN(coord[0]) && parseFloat(coord[0]) !== undefined
  });
  var coordsArray = coords.map(function(coord) {
    return new Coordinate(coord[1],coord[0],coord[2])
  });
  if (coordsArray.length > 2) {
    coordsArray = coordsArray.filter(function(coord, i, coordsArray) {
      if (i > 0 && coord.equals(coordsArray[i - 1])) {
        var duplicate = coord.toKml();
        console.log("Repeated point! Type:" + type + " Polygon:" + name + " Pt:\n" + duplicate + duplicate);
        if (document.getElementById('outputErrors') != null && document.getElementById('outputErrors').checked) {
          correctedString = correctedString.replace(duplicate + duplicate, duplicate);
          errorCount++
        }
        return false
      }
      return true
    })
  }
  coordsArray.type = type;
  coordsArray.name = name;
  coordsArray.filename = filename;
  if (type === "Polygon") {
    if (coordsArray.length > 1 && coordsArray[0].equals(coordsArray[coordsArray.length - 1]))
      coordsArray.pop();
    else {
      console.log("No duplicate end point! Type:" + type + " Polygon:\n" + name + "\n" + coordsArray[0].lng + "," + coordsArray[0].lat + "\n" + coordsArray[coordsArray.length - 1].lng + "," + coordsArray[coordsArray.length - 1].lat);
      errorCount++
    }
  }
  return coordsArray
}
function coordsArraysToKml(coordsArrays) {
  return coordsArrays.map(function(coordsArray) {
    return new Placemark(coordsArray.type,coordsArray.name,coordsArray.styleUrl,coordsArray).setAltitudeMode(coordsArray.altitudeMode)
  })
}
function colorHTMLToKML(htmlColor) {
  return "ff" + htmlColor.substr(5, 2) + htmlColor.substr(3, 2) + htmlColor.substr(1, 2)
}
function splitPolygon(polygon, index1, index2) {
  if (index1 > index2) {
    var temp = index1;
    index1 = index2;
    index2 = temp
  }
  var segments = [];
  segments.push(polygon.slice(index1, index2 + 1));
  segments.push(polygon.slice(index2).concat(polygon.slice(0, index1 + 1)));
  return segments
}
function joinSegmentsExact(s1, s2) {
  if (s1.length === 0)
    return s2;
  if (s2.length === 0)
    return s1;
  if (s1[s1.length - 1].equals(s2[0]))
    return concatSegments(s1, s2);
  else if (s2[s2.length - 1].equals(s1[0]))
    return concatSegments(s2, s1);
  else {
    s2 = s2.slice(0);
    s2.reverse();
    if (s1[s1.length - 1].equals(s2[0]))
      return concatSegments(s1, s2);
    else if (s2[s2.length - 1].equals(s1[0]))
      return concatSegments(s2, s1);
    else {
      console.log("Warning:failed to join segments");
      return false
    }
  }
}
function joinMultiSegmentsExact() {
  var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
  var result = args[0].slice(0);
  args.splice(0, 1);
  while (args.length > 0) {
    var match = args.findIndex(function(arg) {
      return arg[0].equals(result[0]) || arg[arg.length - 1].equals(result[0]) || arg[0].equals(result[result.length - 1]) || arg[arg.length - 1].equals(result[result.length - 1])
    });
    if (match === -1) {
      console.log("Segments don't match");
      return
    }
    result = joinSegmentsExact(result, args[match]);
    args.splice(match, 1)
  }
  return result
}
function concatSegments(s1, s2) {
  var s = s1.concat(s2.slice(1));
  if (s[0].equals(s[s.length - 1]))
    s.pop();
  return s
}
function latToM() {
  var R = 6378137;
  var circumference = 2 * Math.PI * R;
  return circumference / 360
}
function lngToM(lat) {
  var R = 6378137;
  return 2 * Math.PI * Math.sin(rad(90 - lat)) * R / 360
}
function mToLat(m) {
  var R = 6378137;
  return m * 360 / (2 * Math.PI * R)
}
function mToLng(m, lat) {
  var R = 6378137;
  return m * 360 / (2 * Math.PI * Math.cos(lat.toRadians()) * R)
}
if (Number.prototype.pad === undefined) {
  Number.prototype.pad = function(width) {
    var n = this + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
  }
}
if (String.prototype.pad === undefined) {
  String.prototype.pad = function(width) {
    var n = this + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
  }
}
function loadKml(fileControl) {
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    alert('The File APIs are not fully supported in this browser.')
  }
  var files = Array.from(fileControl.files);
  if (files.length === 0) {
    alert("Please select a file");
    throw "No file selected"
  }
  var kmlStrings = [];
  return files.map(function(f) {
    return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              switch (theFile.name.slice(-4)) {
                case ".kml":
                  resolve({
                    kmlString: e.target.result,
                    filename: theFile.name
                  });
                  return;
                case ".kmz":
                  var zip = new JSZip(e.target.result);
                  kmlStrings = [];
                  var zipfiles = Array.from(zip.files);
                  zipfiles.forEach(function(index, zipEntry) {
                    if (zipEntry.name.slice(-4) === ".kml")
                      kmlStrings.push({
                        kmlString: zipEntry.asText(),
                        filename: zipEntry.name
                      });
                    else
                      console.log("Non-KML file found in KMZ:" + zipEntry.name)
                  });
                  resolve(kmlStrings);
                  return;
                default:
                  alert("Can only read .kml and .kmz files.");
                  throw "Incorrect file type.";
              }
            }
          })(f);
          if (f.name.slice(-4) === ".kml")
            reader.readAsText(f, "UTF-8");
          else if (f.name.slice(-4) === ".kmz")
            reader.readAsArrayBuffer(f);
          else
            alert("Unknown file type:" + f.name)
        }
    )
  })
}
function parseKmls(kmlStrings) {
  var flatten = function flatten(a) {
    var _ref;
    return Array.isArray(a) ? (_ref = []).concat.apply(_ref, _toConsumableArray(a.map(flatten))) : a
  };
  kmlStrings = flatten(kmlStrings);
  return kmlStrings.map(function(kmlString) {
    return parseKml(kmlString.kmlString, kmlString.filename)
  })
}
function parseKml(kmlString, filename) {
  var xmlDoc = jQuery.parseXML(kmlString);
  var $xml = jQuery(jQuery(xmlDoc).children()[0]);
  var rootKml = new Kml();
  var getAttribute = function getAttribute(attributes, attributeName) {
    if (typeof attributes !== 'undefined') {
      return Array.from(attributes).find(function(attribute) {
        return attribute.name === attributeName
      }).nodeValue
    }
  };
  var attachAttributes = function attachAttributes(obj, attributes) {
    if (typeof attributes !== 'undefined') {
      Array.from(attributes).forEach(function(attribute) {
        return obj[attribute.name] = attribute.nodeValue
      })
    }
  };
  var processChildren = function processChildren(node, obj, attributes) {
    attachAttributes(obj, attributes);
    return node.children().each(function() {
      processXml(this, obj)
    })
  };
  var processXml = function processXml(xml, root) {
    var node = jQuery(xml);
    var nodeItem = node[0];
    var attributes = nodeItem.attributes;
    var nodeName = nodeItem.nodeName;
    var nodeContent = nodeItem.textContent.trim().split('&').join('&');
    var simpleFields = ['name', 'styleUrl', 'open', 'heading', 'tilt', 'range', 'altitudeMode', 'gx:flyToMode', 'begin', 'end', 'text', 'longitude', 'latitude', 'altitude', 'gx:duration', 'scale', 'color', 'width', 'key', 'href', 'tessellate', 'visibility', 'description', 'address', 'phoneNumber', 'north', 'south', 'east', 'west', 'minAltitude', 'maxAltitude', 'displayName', 'value', 'refreshVisibility', 'flyToView', 'refreshMode', 'refreshInterval', 'viewRefreshMode', 'viewRefreshTime', 'viewBoundScale', 'viewFormat', 'httpQuery', 'roll', 'minLodPixels', 'maxLodPixels', 'minRefreshPeriod', 'maxSessionLength', 'cookie', 'message', 'linkName', 'linkDescription', 'expires', 'targetHref', 'extrude', 'x', 'y', 'w', 'h', 'z', 'drawOrder', 'rotation', 'gx:drawOrder', 'gx:x', 'gx:y', 'gx:w', 'gx:h', 'fill', 'listItemType', 'sourceHref', 'gx:altitudeOffset', 'outline', 'bgColor', 'textColor', 'displayMode', 'state', 'gx:outerColor', 'gx:outerWidth', 'gx:physicalWidth', 'gx:labelVisibility', 'colorMode', 'shape', 'leftFov', 'rightFov', 'bottomFov', 'topFov', 'tileSize', 'maxWidth', 'maxHeight', 'gridOrigin', 'gx:delayedStart', 'gx:playMode', 'minFadeExtent', 'maxFadeExtent', 'gx:interpolate'];
    if (simpleFields.indexOf(nodeName) !== -1) {
      if (nodeName.indexOf("gx:") === 0)
        root[nodeName.substring(3)] = nodeContent;
      else
        root[nodeName] = nodeContent;
      return
    }
    var complexFieldsArrays = {
      'Document': {
        clss: Document,
        prop: 'features'
      },
      'Folder': {
        clss: Folder,
        prop: 'features'
      },
      'NetworkLink': {
        clss: NetworkLink,
        prop: 'features'
      },
      'Style': {
        clss: Style,
        prop: 'styles'
      },
      'StyleMap': {
        clss: StyleMap,
        prop: 'styles'
      },
      'Schema': {
        clss: Schema,
        prop: 'schemas'
      },
      'Pair': {
        clss: Pair,
        prop: 'pairs'
      },
      'Data': {
        clss: Data,
        prop: 'datas'
      },
      'Placemark': {
        clss: Placemark,
        prop: 'features'
      },
      'gx:Tour': {
        clss: Tour,
        prop: 'features'
      },
      'gx:FlyTo': {
        clss: FlyTo,
        prop: 'tourPrimitives'
      },
      'SimpleField': {
        clss: SimpleField,
        prop: 'simpleFields'
      },
      'gx:Wait': {
        clss: Wait,
        prop: 'tourPrimitives'
      },
      'gx:SoundCue': {
        clss: SoundCue,
        prop: 'tourPrimitives'
      },
      'gx:AnimatedUpdate': {
        clss: AnimatedUpdate,
        prop: 'tourPrimitives'
      },
      'gx:TourControl': {
        clss: TourControl,
        prop: 'tourPrimitives'
      },
      'GroundOverlay': {
        clss: GroundOverlay,
        prop: 'features'
      },
      'ScreenOverlay': {
        clss: ScreenOverlay,
        prop: 'features'
      },
      'PhotoOverlay': {
        clss: PhotoOverlay,
        prop: 'features'
      },
      'Alias': {
        clss: Alias,
        prop: 'aliass'
      },
      'ItemIcon': {
        clss: ItemIcon,
        prop: 'itemIcons'
      },
      'innerBoundaryIs': {
        clss: InnerBoundaryIs,
        prop: 'innerBoundaryIss'
      },
      'gx:SimpleArrayData': {
        clss: SimpleArrayData,
        prop: 'simpleArrayDatas'
      }
    };
    var complexFieldsProps = {
      'Link': {
        clss: Link,
        prop: 'link'
      },
      'gx:ViewerOptions': {
        clss: ViewerOptions,
        prop: 'viewerOptions'
      },
      'BalloonStyle': {
        clss: BalloonStyle,
        prop: 'balloonStyle'
      },
      'IconStyle': {
        clss: IconStyle,
        prop: 'iconStyle'
      },
      'LineStyle': {
        clss: LineStyle,
        prop: 'lineStyle'
      },
      'PolyStyle': {
        clss: PolyStyle,
        prop: 'polyStyle'
      },
      'ListStyle': {
        clss: ListStyle,
        prop: 'listStyle'
      },
      'LabelStyle': {
        clss: LabelStyle,
        prop: 'labelStyle'
      },
      'LookAt': {
        clss: LookAt,
        prop: 'abstractView'
      },
      'gx:IconStackStyle': {
        clss: IconStackStyle,
        prop: 'iconStackStyle'
      },
      'gx:Playlist': {
        clss: Playlist,
        prop: 'playlist'
      },
      'Icon': {
        clss: Icon,
        prop: 'icon'
      },
      'gx:TimeStamp': {
        clss: TimePrimitive,
        prop: 'timePrimitive'
      },
      'gx:TimeSpan': {
        clss: TimePrimitive,
        prop: 'timePrimitive'
      },
      'Region': {
        clss: Region,
        prop: 'region'
      },
      'Location': {
        clss: Location,
        prop: 'location'
      },
      'Orientation': {
        clss: Orientation,
        prop: 'orientation'
      },
      'Scale': {
        clss: Scale,
        prop: 'scale'
      },
      'ResourceMap': {
        clss: ResourceMap,
        prop: 'resourceMap'
      },
      'LatLonAltBox': {
        clss: LatLonAltBox,
        prop: 'latLonAltBox'
      },
      'Lod': {
        clss: Lod,
        prop: 'lod'
      },
      'LatLonBox': {
        clss: LatLonBox,
        prop: 'latLonBox'
      },
      'gx:LatLonQuad': {
        clss: LatLonQuad,
        prop: 'latLonQuad'
      },
      'ExtendedData': {
        clss: ExtendedData,
        prop: 'extendedData'
      },
      'Camera': {
        clss: Camera,
        prop: 'abstractView'
      },
      'NetworkLinkControl': {
        clss: NetworkLinkControl,
        prop: 'networkLinkControl'
      },
      'Update': {
        clss: Update,
        prop: 'update'
      },
      'Change': {
        clss: Change,
        prop: 'change'
      },
      'Create': {
        clss: Create,
        prop: 'create'
      },
      'Delete': {
        clss: Delete,
        prop: 'delete'
      },
      'SchemaData': {
        clss: SchemaData,
        prop: 'schemaData'
      },
      'outerBoundaryIs': {
        clss: OuterBoundaryIs,
        prop: 'outerBoundaryIs'
      },
      'ViewVolume': {
        clss: ViewVolume,
        prop: 'viewVolume'
      },
      'ImagePyramid': {
        clss: ImagePyramid,
        prop: 'imagePyramid'
      }
    };
    var vec2Fields = ['overlayXY', 'screenXY', 'rotationXY', 'size', 'hotSpot'];
    var obj = undefined;
    if (complexFieldsArrays.hasOwnProperty(nodeName)) {
      obj = new complexFieldsArrays[nodeName].clss()
    } else if (complexFieldsProps.hasOwnProperty(nodeName)) {
      obj = new complexFieldsProps[nodeName].clss()
    } else if (vec2Fields.indexOf(nodeName) !== -1) {
      obj = new Vec2()
    }
    if (root instanceof Change) {
      if (typeof obj === 'undefined') {
        console.log("Error: property not found: " + nodeName);
        return
      }
      root.changes.push(obj);
      return processChildren(node, obj, attributes)
    }
    if (root instanceof Create) {
      if (typeof obj === 'undefined') {
        console.log("Error: property not found: " + nodeName);
        return
      }
      root.creates.push(obj);
      return processChildren(node, obj, attributes)
    }
    if (root instanceof Delete) {
      if (typeof obj === 'undefined') {
        console.log("Error: property not found: " + nodeName);
        return
      }
      root.deletes.push(obj);
      return processChildren(node, obj, attributes)
    }
    if (complexFieldsArrays.hasOwnProperty(nodeName)) {
      if (typeof root[complexFieldsArrays[nodeName].prop] === 'undefined')
        console.log("Error: property not found: " + complexFieldsArrays[nodeName].prop);
      root[complexFieldsArrays[nodeName].prop].push(obj);
      return processChildren(node, obj, attributes)
    }
    if (complexFieldsProps.hasOwnProperty(nodeName)) {
      root[complexFieldsProps[nodeName].prop] = obj;
      return processChildren(node, obj, attributes)
    }
    if (vec2Fields.indexOf(nodeName) !== -1) {
      attachAttributes(obj, attributes);
      root[nodeName] = obj;
      return
    }
    function geometry(obj) {
      if (root instanceof MultiGeometry)
        root.geometries.push(obj);
      else
        root.geometry = obj;
      return processChildren(node, obj, attributes)
    }
    switch (nodeName) {
      case 'gx:value':
        root.contents.push(nodeContent);
        return;
      case 'gx:option':
        obj = {};
        root.options.push(obj);
        attachAttributes(obj, attributes);
        return;
      case 'SimpleData':
        obj = new SimpleData();
        attachAttributes(obj, attributes);
        obj.contents = nodeContent;
        root.simpleDatas.push(obj);
        return;
      case 'gx:altitudeMode':
        root.altitudeMode = nodeContent;
        return '';
      case 'MultiGeometry':
        return geometry(new MultiGeometry());
      case 'LineString':
        return geometry(new LineString());
      case 'Polygon':
        return geometry(new Polygon());
      case 'MultiTrack':
        return geometry(new MultiTrack());
      case 'Model':
        obj = new Model();
        if (root instanceof MultiGeometry)
          root.geometries.push(obj);
        if (root instanceof Track) {
          root.model = obj
        } else {
          root.geometry = obj
        }
        return processChildren(node, obj, attributes);
      case 'Track':
        obj = new Track();
        if (root instanceof MultiGeometry) {
          root.geometries.push(obj)
        }
        if (root instanceof MultiTrack) {
          root.tracks.push(obj)
        } else {
          root.geometry = obj
        }
        return processChildren(node, obj, attributes);
      case 'Point':
        obj = new Point();
        if (root instanceof MultiGeometry)
          root.geometries.push(obj);
        else if (root instanceof PhotoOverlay) {
          root.point = obj
        } else {
          root.geometry = obj
        }
        return processChildren(node, obj, attributes);
      case 'LinearRing':
        obj = new LinearRing();
        if (root instanceof MultiGeometry) {
          root.geometries.push(obj)
        } else if (root instanceof Placemark) {
          root.geometry = obj
        } else if (root instanceof OuterBoundaryIs) {
          root.linearRing = obj
        } else if (root instanceof InnerBoundaryIs) {
          root.linearRings.push(obj)
        }
        return processChildren(node, obj, attributes);
      case 'linkSnippet':
        root.linkSnippet = nodeContent;
        root.linkSnippetMaxLines = getAttribute(attributes, "maxLines");
        return;
      case 'coordinates':
        root.coordinates = coordsStringToArray(nodeContent);
        return;
      case 'atom:author':
        root.author = nodeContent;
        return;
      case 'atom:link':
        root.linkHref = getAttribute(attributes, "href");
        return;
      case 'xal:AddressDetails':
        root.addressDetails = nodeContent;
        return;
      case 'Snippet':
        root.snippet = nodeContent;
        root.snippetMaxLines = getAttribute(attributes, "maxLines");
        return;
      case 'when':
        if (root instanceof Track)
          root.whens.push(nodeContent);
        else
          root.when = nodeContent;
        return;
      case 'gx:coord':
        var coords = nodeContent.split(' ');
        root.coords.push(new Coordinate(coords[1],coords[0],coords[2]));
        return;
      case 'gx:angles':
        var angle = nodeContent.split(' ');
        root.angles.push({
          heading: angle[0],
          tilt: angle[1],
          roll: angle[2]
        });
        return;
      default:
        console.log("Unknown tag: " + nodeItem.nodeName);
    }
  };
  processChildren($xml, rootKml);
  return rootKml
}
function find(root, obj) {
  var objs = [];
  var findChildren = function findChildren(root) {
    if (root instanceof obj) {
      objs.push(root)
    }
    for (var propt in root) {
      var property = root[propt];
      if ((typeof property === "undefined" ? "undefined" : _typeof(property)) === 'object') {
        if (Array.isArray(property)) {
          property.forEach(function(property) {
            return findChildren(property)
          })
        } else {
          findChildren(property)
        }
      }
    }
  };
  findChildren(root);
  return objs
}
var Gnomonic = (function() {
  function Gnomonic(earth) {
    _classCallCheck(this, Gnomonic);
    this.eps0 = GeographicLib.Math.epsilon;
    this.eps = 0.01 * Math.sqrt(this.eps0);
    this.earth = earth;
    this.a = earth.a;
    this.f = earth.f
  }
  _createClass(Gnomonic, [{
    key: "forward",
    value: function forward(p1, p2) {
      var vals = this.earth.Inverse(p1.lat, p1.lng, p2.lat, p2.lng, GeographicLib.Geodesic.AZIMUTH | GeographicLib.Geodesic.REDUCEDLENGTH | GeographicLib.Geodesic.GEODESICSCALE);
      var rho = vals.m12 / vals.M12;
      var t = GeographicLib.Math.sincosd(vals.azi1);
      return {
        x: t.s * rho,
        y: t.c * rho,
        azi: vals.azi2
      }
    }
  }, {
    key: "reverse",
    value: function reverse(p, x, y) {
      var Geodesic = GeographicLib.Geodesic;
      var azi0 = GeographicLib.Math.atan2d(x, y);
      var rho = GeographicLib.Math.hypot(x, y);
      var s = this.a * Math.atan(rho / this.a);
      var little = rho <= this.a;
      if (!little)
        rho = 1 / rho;
      var line = this.earth.Line(p.lat, p.lng, azi0, Geodesic.LATITUDE | Geodesic.LONGITUDE | Geodesic.AZIMUTH | Geodesic.DISTANCE_IN | Geodesic.REDUCEDLENGTH | Geodesic.GEODESICSCALE);
      var count = 30;
      var trip = false;
      var r = {};
      var vals = undefined
          , M = undefined;
      while (count-- > 0) {
        vals = line.Position(s, Geodesic.LATITUDE | Geodesic.LONGITUDE | Geodesic.DISTANCE_IN | Geodesic.REDUCEDLENGTH | Geodesic.GEODESICSCALE);
        var m = vals.m12;
        M = vals.M12;
        if (trip)
          break;
        var ds = little ? (m / M - rho) * M * M : (rho - M / m) * m * m;
        s -= ds;
        if (!(Math.abs(ds) >= this.eps * this.a))
          trip = true
      }
      r.lat = vals.lat2;
      r.lng = vals.lon2;
      return r
    }
  }]);
  return Gnomonic
})();
var Vector3 = (function() {
  function Vector3(x, y, z) {
    _classCallCheck(this, Vector3);
    z = z || 1;
    this.x = x;
    this.y = y;
    this.z = z
  }
  _createClass(Vector3, [{
    key: "cross",
    value: function cross(b) {
      return new Vector3(this.y * b.z - this.z * b.y,this.z * b.x - this.x * b.z,this.x * b.y - this.y * b.x)
    }
  }, {
    key: "norm",
    value: function norm() {
      this.x /= this.z;
      this.y /= this.z;
      this.z = 1
    }
  }]);
  return Vector3
})();
function _findIntersection(sa, sb) {
  var Geodesic = GeographicLib.Geodesic;
  var geod = Geodesic.WGS84;
  var gn = new Gnomonic(geod);
  var c = new Coordinate((sa.p1.lat + sa.p2 + sb.p1.lat + sb.p2.lat) / 4,(sa.p1.lng + sa.p2 + sb.p1.lng + sb.p2.lng) / 4);
  for (var _i3 = 0; _i3 < 20; _i3 += 1) {
    var ra1 = gn.forward(c, sa.p1);
    var ra2 = gn.forward(c, sa.p2);
    var rb1 = gn.forward(c, sb.p1);
    var rb2 = gn.forward(c, sb.p2);
    var va1 = new Vector3(ra1.x,ra1.y);
    var va2 = new Vector3(ra2.x,ra2.y);
    var vb1 = new Vector3(rb1.x,rb1.y);
    var vb2 = new Vector3(rb2.x,rb2.y);
    var la = va1.cross(va2);
    var lb = vb1.cross(vb2);
    var p0 = la.cross(lb);
    p0.norm();
    var r = gn.reverse(c, p0.x, p0.y);
    var delta = Math.max(Math.abs(c.lat - r.lat), Math.abs(c.lng - r.lng));
    if (delta < 1e-14) {
      break
    }
    c.clone(r);
    var a = c.antipode();
    if (a.distanceTo(sa.p1) < c.distanceTo(sa.p1))
      c = a
  }
  return c
}
function _crossTrackIntercept(p1, segment) {
  var Geodesic = GeographicLib.Geodesic;
  var geod = Geodesic.WGS84;
  var gn = new Gnomonic(geod);
  var c = new Coordinate((segment.p1.lat + segment.p2.lat) / 2,(segment.p1.lng + segment.p2.lng) / 2);
  for (var _i4 = 0; _i4 < 20; ++_i4) {
    var ra1 = gn.forward(c, segment.p1);
    var ra2 = gn.forward(c, segment.p2);
    var rb1 = gn.forward(c, p1);
    var va1 = new Vector3(ra1.x,ra1.y);
    var va2 = new Vector3(ra2.x,ra2.y);
    var la = va1.cross(va2);
    var vb1 = new Vector3(rb1.x,rb1.y);
    var lb = new Vector3(la.y,-la.x,la.x * rb1.y - la.y * rb1.x);
    var p0 = la.cross(lb);
    p0.norm();
    var r = gn.reverse(c, p0.x, p0.y);
    var delta = Math.max(Math.abs(c.lat - r.lat), Math.abs(c.lng - r.lng));
    if (delta < 1e-14) {
      break
    }
    c.clone(r)
  }
  return c
}
(function() {
  function decimalAdjust(type, value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value)
    }
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN
    }
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp))
  }
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp)
    }
  }
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp)
    }
  }
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp)
    }
  }
})();
function parse() {
  showProgress("Starting....").then(function() {
    Promise.all(loadKml(document.getElementById('file'))).then(function(kmlStrings) {
      showProgress("Parsing....").then(function() {
        var kmls = parseKmls(kmlStrings);
        showProgress("Processing....").then(function() {
          compressLatLngs = true;
          compressionLength = document.getElementById('decimals').value;
          altitude_decimals = true;
          var kmlStrings2 = kmls.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue.toKml()
          }, "");
          download("Compressed.kml", kmlStrings2);
          showProgress("Done")
        })
      })
    })
  })
}
function showProgress(progress) {
  return new Promise(function(resolve, reject) {
        document.getElementById('output').innerHTML = progress;
        setTimeout(resolve, 100, "done")
      }
  )
}
