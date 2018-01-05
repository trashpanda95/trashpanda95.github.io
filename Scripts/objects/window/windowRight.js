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
    var WindowRight = /** @class */ (function (_super) {
        __extends(WindowRight, _super);
        // PRIVATE INSTANCE VARIABLES
        // CONSTRUCTORS
        function WindowRight() {
            var _this = _super.call(this, "windowRight") || this;
            _this.Start();
            return _this;
        }
        WindowRight.prototype.Start = function () {
            this.y = 374;
            this.x = 830;
            this.windowRightHealth = 100;
            this.isBroken = false;
            this.regXY();
        };
        WindowRight.prototype.Update = function () { };
        WindowRight.prototype.Reset = function () { };
        // PRIVATE METHODS   
        WindowRight.prototype.regXY = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width / 2;
            this.halfHeight = this.height / 2;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        };
        return WindowRight;
    }(objects.GameObject));
    objects.WindowRight = WindowRight;
})(objects || (objects = {}));
//# sourceMappingURL=windowRight.js.map