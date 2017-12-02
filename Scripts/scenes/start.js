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
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        //PUBLIC PROPETIES
        //CONSTRUCTORS
        function Start(assetManager, currentScene) {
            var _this = _super.call(this) || this;
            _this.assetManager = assetManager;
            _this.currentScene = currentScene;
            _this.Start();
            return _this;
        }
        //PRIVATE METHOS
        //PUBLIC METHODS
        Start.prototype.Start = function () {
            this.gameTitle = new objects.Label("THE INVASION", "80px", "Dock51", "#00000", 400, 250, true);
            this.addChild(this.gameTitle);
            this.startButton = new objects.Button(this.assetManager, "startBtn", 400, 350, true);
            this.addChild(this.startButton);
            this.onClickStartBtn();
        };
        Start.prototype.Update = function () {
            return this.currentScene;
        };
        Start.prototype.onClickStartBtn = function () {
            var _this = this;
            this.startButton.on("click", function () {
                _this.currentScene = config.Scene.PLAY;
                _this.removeAllChildren();
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map