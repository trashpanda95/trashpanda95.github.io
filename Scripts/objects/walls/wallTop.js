var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var WallTop = /** @class */ (function (_super) {
        __extends(WallTop, _super);
        // CONSTRUCTORS
        function WallTop() {
            var _this = _super.call(this, "topWall") || this;
            _this.y = 71;
            _this.x = 113;
            return _this;
        }
        // PRIVATE METHODS
        WallTop.prototype.regXY = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width / 2;
            this.halfHeight = this.height / 2;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        };
        WallTop.prototype.Start = function () { };
        WallTop.prototype.Update = function () { };
        WallTop.prototype.Reset = function () { };
        return WallTop;
    }(objects.GameObject));
    objects.WallTop = WallTop;
})(objects || (objects = {}));
//# sourceMappingURL=wallTop.js.map