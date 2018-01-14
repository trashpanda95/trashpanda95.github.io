//IIFE - Immediately Invoked Function Expression
(function()
{
    // game variables
    let assetManager: managers.AssetManager;
    let currentScene: objects.Scene;
    let currentState: number;
    let debugCanvas: HTMLElement;
    let gameCanvas: HTMLElement;
    let height: number = config.Screen.HEIGHT;
    let stage: createjs.Stage;
    let width: number = config.Screen.WIDTH;
    //let stats: Stats;

    //Spritesheet

    function SetupStats(): void {
        //stats = new Stats();
        //stats.showPanel(0);
        //document.body.appendChild(stats.dom);
    }

    // Initializes game variables
    function Init(): void {
        console.log("Initialization");
        //SetupStats();
        gameCanvas = document.getElementById("game");
        //debugCanvas = document.getElementById("debug");
        gameCanvas.setAttribute("width", width.toString());
        gameCanvas.setAttribute("height", height.toString());
        //debugCanvas.setAttribute("width", width.toString());
       // debugCanvas.setAttribute("height", height.toString());

        objects.Game.assetManager.on("complete", Start);
        // set global game object variables
    }

    // Starts game
    function Start(): void {
        console.log("Start");
        stage = new createjs.Stage(gameCanvas);
        objects.Game.stage = stage; // save the stage to the global game object
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);

        currentState = config.Scene.START;
        Main();
    }

    // Main Game Loop
    function Update(): void {
        //stats.begin();
        let newState = currentScene.Update();
        if (newState != currentState) {
            currentState = newState;
            Main();
        }

        //stats.end();
        stage.update();
    }

    function Main(): void {
        console.log("Main FSM");
        stage.removeAllChildren();

        switch (currentState) {
            case config.Scene.START:
                currentScene = new scenes.Start(currentState);
                break;

            case config.Scene.LEVEL1:
                currentScene = new scenes.Level1(currentState, gameCanvas);
                break;

            case config.Scene.LEVEL2:
            currentScene = new scenes.Level2(currentState, gameCanvas);
            break;

            case config.Scene.END:
                currentScene = new scenes.End(currentState);
                break;
        }

        stage.addChild(currentScene);

    }

    window.onload = Init;
})();
