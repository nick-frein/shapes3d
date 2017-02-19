/**
 * Created by Hans Dulimarta.
 */
let modelMat = mat4.create();
let canvas, paramGroup;
var currSelection = 0;
var currRotationAxis = "rotx";
let posAttr, colAttr, modelUnif;
let gl;
let obj;

function main() {
    canvas = document.getElementById("gl-canvas");

    /* setup event listener for drop-down menu */
    let menu = document.getElementById("menu");
    menu.addEventListener("change", menuSelected);

    /* setup click listener for th "insert" button */
    let button = document.getElementById("insert");
    button.addEventListener("click", createObject);

    /* setup click listener for the radio buttons (axis of rotation) */
    let radioGroup = document.getElementsByName("rotateGroup");
    for (let r of radioGroup) {
        r.addEventListener('click', rbClicked);
    }

    paramGroup = document.getElementsByClassName("param-group");
    paramGroup[0].hidden = false;

    /* setup window resize listener */
    window.addEventListener('resize', resizeWindow);

    gl = WebGLUtils.create3DContext(canvas, null);
    ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl")
        .then (prog => {

            /* put all one-time initialization logic here */
            gl.useProgram (prog);
            gl.clearColor (0, 0, 0, 1);
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);

            /* the vertex shader defines TWO attribute vars and ONE uniform var */
            gl.enable (gl.DEPTH_TEST);
            posAttr = gl.getAttribLocation (prog, "vertexPos");
            colAttr = gl.getAttribLocation (prog, "vertexCol");
            modelUnif = gl.getUniformLocation (prog, "modelCF");
            gl.enableVertexAttribArray (posAttr);
            gl.enableVertexAttribArray (colAttr);

            /* calculate viewport */
            resizeWindow();

            /* initiate the render loop */
            render();
        });
}

function drawScene() {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    /* in the following three cases we rotate the coordinate frame by 1 degree */
    switch (currRotationAxis) {
        case "rotx":
            mat4.rotateX(modelMat, modelMat, Math.PI / 180);
            break;
        case "roty":
            mat4.rotateY(modelMat, modelMat, Math.PI / 180);
            break;
        case "rotz":
            mat4.rotateZ(modelMat, modelMat, Math.PI / 180);
    }

    if (obj) {
        obj.draw(posAttr, colAttr, modelUnif, modelMat);
    }
}

function render() {
    drawScene();
    requestAnimationFrame(render);
}

function createObject() {
    obj = null;
    mat4.identity(modelMat);
    switch (currSelection) {
        case 0:
            let coneHeight = document.getElementById("cone-height").valueAsNumber;
            let coneRadius = document.getElementById("cone-radius").valueAsNumber;
            let coneSubDiv = document.getElementById("cone-subdiv").valueAsNumber;
            let coneVertSubDiv = document.getElementById("vert-cone-subdiv").valueAsNumber;
            console.log ("Cylinder radius: " + coneRadius + " height: " + coneHeight + " sub division: " + coneSubDiv + " vertical sub division: " + coneVertSubDiv);
            obj = new Cone(gl, coneRadius, coneHeight, coneSubDiv, coneVertSubDiv);
            break;
        case 1:
            let cylHeight = document.getElementById("cyl-height").valueAsNumber;
            let cylTopRadius = document.getElementById("cyl-top-radius").valueAsNumber;
            let cylBotRadius = document.getElementById("cyl-bot-radius").valueAsNumber;
            let cylSubDiv = document.getElementById("cyl-subdiv").valueAsNumber;
            let cylVertSubDiv = document.getElementById("vert-cyl-subdiv").valueAsNumber;
            console.log ("Cylinder top radius: " + cylTopRadius + "Cylinder bot radius: " + cylBotRadius + " height: " + cylHeight + " sub division: " + cylSubDiv + " vertical sub division: " + cylVertSubDiv);
            obj = new Cylinder(gl, cylTopRadius, cylBotRadius, cylHeight, cylSubDiv, cylVertSubDiv);
            break;
        case 2:
            let cubeSubDiv = document.getElementById("cube-subdiv").valueAsNumber;
            console.log (" sub division: " + cubeSubDiv);
            obj = new Cube(gl, cubeSubDiv);
            break;
        case 3:
            let sphereHeight = document.getElementById("sphere-height").valueAsNumber;
            let sphereRadius = document.getElementById("sphere-radius").valueAsNumber;
            let sphereSubDiv = document.getElementById("sphere-subdiv").valueAsNumber;
            let sphereVertSubDiv = document.getElementById("vert-sphere-subdiv").valueAsNumber;
            console.log ("sphere radius: " + sphereRadius + " height: " + sphereHeight + " sub division: " +
                sphereSubDiv + " vertical sub division: " + sphereVertSubDiv);
            obj = new Hemisphere(gl, sphereRadius, sphereHeight, sphereSubDiv, sphereVertSubDiv);
            break;
        case 4:
            let rsphereSubDiv = document.getElementById("rsphere-subdiv").valueAsNumber;
            console.log (" sub division: " + rsphereSubDiv);
            obj = new RecursiveSphere(gl, rsphereSubDiv);
            break;
        case 5:
            let ringHeight = document.getElementById("ring-height").valueAsNumber;
            let ringTopRadius = document.getElementById("ring-top-radius").valueAsNumber;
            let ringBotRadius = document.getElementById("ring-bot-radius").valueAsNumber;
            let ringSubDiv = document.getElementById("ring-subdiv").valueAsNumber;
            let ringVertSubDiv = document.getElementById("vert-ring-subdiv").valueAsNumber;
            console.log ("Cylinder top radius: " + ringTopRadius + "Cylinder bot radius: " + ringBotRadius + " height: " + ringHeight + " sub division: " + ringSubDiv + " vertical sub division: " + ringVertSubDiv);
            obj = new Ring(gl, ringTopRadius, ringBotRadius, ringHeight, ringSubDiv, ringVertSubDiv);
            break;
    }
}

function resizeWindow() {
    let w = 0.98 * window.innerWidth;
    let h = 0.6 * window.innerHeight;
    let size = Math.min(0.98 * window.innerWidth, 0.65 * window.innerHeight);
    /* keep a square viewport */
    canvas.width = size;
    canvas.height = size;
    gl.viewport(0, 0, size, size);
}

function menuSelected(ev) {
    let sel = ev.currentTarget.selectedIndex;
    paramGroup[currSelection].hidden = true;
    paramGroup[sel].hidden = false;
    currSelection = sel;
    console.log("New selection is ", currSelection);
}

function rbClicked(ev) {
    currRotationAxis = ev.currentTarget.value;
    console.log(ev);
}