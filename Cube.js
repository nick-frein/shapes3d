/**
 * Created by nickfrein on 2/9/17.
 */
/**
 * Created by Brendan on 2/9/2017.
 */
/**
 * Created by Hans Dulimarta on 2/1/17.
 */
class Cube {
    /**
     * Create a 3D cylinder with tip at the Z+ axis and base on the XY plane
     * @param {Object} gl      the current WebGL context
     * @param {vec3}   col1    color #1 to use
     * @param {vec3}   col2    color #2 to use
     */
    constructor (gl, cubeSubDiv, col1, col2) {

        /* if colors are undefined, generate random colors */
        if (typeof col1 === "undefined") col1 = vec3.fromValues(Math.random(), Math.random(), Math.random());
        if (typeof col2 === "undefined") col2 = vec3.fromValues(Math.random(), Math.random(), Math.random());
        let randColor = vec3.create();
        let vertices = [];
        this.vbuff = gl.createBuffer();

        /* Instead of allocating two separate JS arrays (one for position and one for color),
         in the following loop we pack both position and color
         so each tuple (x,y,z,r,g,b) describes the properties of a vertex
         */
        //let x1 = 0;
        //let y1 = 0;
        //vertices.push(0,0,height); /* top center of cube */
        //vec3.lerp (randColor, col1, col2, Math.random()); /* linear interpolation between two colors */
        //vertices.push(randColor[0], randColor[1], randColor[2]);
        //for (let xAxis = 0; xAxis <= subDiv; xAxis++) {
        //  for (let yAxis = 0; yAxis < subDiv; yAxis++) {
        //    /* the first three floats are 3D (x,y,z) position */
        //  x1= (subDiv-xAxis)-(subDiv/2);
        //y1= (subDiv-yAxis)-(subDiv/2);
        //vertices.push(x1, y1, 0);
        ///* perimeter of base */
        //vec3.lerp(randColor, col1, col2, Math.random());
        /* linear interpolation between two colors */
        /* the next three floats are RGB */
        //vertices.push(randColor[0], randColor[1], randColor[2]);
        //}
        //}
        //vertices.push(0,0,0);


        //vertices.push(0,0,0);
        //vertices.push(3,3,-1);
        //vec3.lerp (randColor, col1, col2, Math.random()); /* linear interpolation between two colors */
        //vertices.push(randColor[0], randColor[1], randColor[2]);
        let count = 0;
        let z = 0;
        let y = 0;
        let x = 0;

        while(z<0.4){
            //cubeSubDiv=2;
            x = -0.2;
            while (x <= 0.2) {
                vertices.push(x, -0.2, z);
                vec3.lerp(randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);
                count++;

                vertices.push(x, -0.2, z + 0.4 / cubeSubDiv);
                vec3.lerp(randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);
                count++;

                x = x + 0.4 / cubeSubDiv;
            }

            let y = -0.2;
            while (y <= 0.2) {
                if (y != -0.2) {
                    vertices.push(0.2, y, z);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;

                    vertices.push(0.2, y, z + 0.4 / cubeSubDiv);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;
                }
                y = y + 0.4 / cubeSubDiv;
            }

            x = 0.2;
            while (x >= -0.2) {
                if (x != 0.2) {
                    vertices.push(x, 0.2, z);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;

                    vertices.push(x, 0.2, z + 0.4 / cubeSubDiv);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;
                }
                x = x - 0.4 / cubeSubDiv;
            }

            y = 0.2;
            while (y >= -0.2) {
                if (y != 0.2) {
                    vertices.push(-0.2, y, z);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;

                    vertices.push(-0.2, y, z + 0.4 / cubeSubDiv);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;
                }
                y = y - 0.4 / cubeSubDiv;
            }

                z = z + 0.4 / cubeSubDiv;
        }
        let totalSideVertices = count;


// top
        let county = 0;
        y=-0.2;
        while(y<0.2){
            x= -0.2;
            while(x <= 0.2){
                if(county != cubeSubDiv) {
                    vertices.push(x, y, 0.4);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;

                    vertices.push(x, y + 0.4 / cubeSubDiv, 0.4);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;
                }
                x=x+0.4/cubeSubDiv;
            }
            //x= 0.2;

            county = county +1;
            y=y+0.4/cubeSubDiv;
        }
        let totalTopVertices = count;


county = 0;
    //bottom
        y=-0.2;
        while(y<0.2){
            x= 0.2;
            while(x >= -0.2){
                if(county != cubeSubDiv) {
                    vertices.push(x, y, 0);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;

                    vertices.push(x, y + 0.4 / cubeSubDiv, 0);
                    vec3.lerp(randColor, col1, col2, Math.random());
                    vertices.push(randColor[0], randColor[1], randColor[2]);
                    count++;
                }
                x=x-0.4/cubeSubDiv;
            }
            //x= 0.2;

            county = county +1;
            y=y+0.4/cubeSubDiv;
        }

        // vertices.push(1,1,-1);
        //vec3.lerp (randColor, col1, col2, Math.random()); /* linear interpolation between two colors */
        //vertices.push(randColor[0], randColor[1], randColor[2]);

        /* copy the (x,y,z,r,g,b) sixtuplet into GPU buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuff);
        gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(vertices), gl.STATIC_DRAW);

        let sideIndex = [];

        for(let k=0; k<totalSideVertices; k++) {
            sideIndex.push(k);
        }

        let topIndex = [];

        for(let k=totalSideVertices; k<totalTopVertices; k++) {
            topIndex.push(k);
        }

        let botIndex = [];

        for(let k=totalTopVertices; k<count; k++) {
            botIndex.push(k);
        }

        /*let botIndex = [];
        for(let count = 0; count<8; count++) {
            botIndex.push(count);
        }*/
        //botIndex.push(3);
        this.sideIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sideIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(sideIndex), gl.STATIC_DRAW);

        this.topIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(topIndex), gl.STATIC_DRAW);

        this.botIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.botIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(botIndex), gl.STATIC_DRAW);




        /*let topIndex = [];
        for(let count3 = 72; count3 < 4*((cubeSubDiv*(cubeSubDiv+1))*2)-4; count3++) {
            topIndex.push(count3);
        }
        //botIndex.push(3);
        this.topIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(topIndex), gl.STATIC_DRAW);
*/



        /* Put the indices as an array of objects. Each object has three attributes:
         primitive, buffer, and numPoints */
        this.indices = [{"primitive": gl.TRIANGLE_STRIP, "buffer": this.sideIdxBuff, "numPoints": sideIndex.length},
            {"primitive": gl.TRIANGLE_STRIP, "buffer": this.topIdxBuff, "numPoints": topIndex.length},
            {"primitive": gl.TRIANGLE_STRIP, "buffer": this.botIdxBuff, "numPoints": botIndex.length}];

    }



    /**
     * Draw the object
     * @param {Number} vertexAttr a handle to a vec3 attribute in the vertex shader for vertex xyz-position
     * @param {Number} colorAttr  a handle to a vec3 attribute in the vertex shader for vertex rgb-color
     * @param {Number} modelUniform a handle to a mat4 uniform in the shader for the coordinate frame of the model
     * @param {mat4} coordFrame a JS mat4 variable that holds the actual coordinate frame of the object
     */
    draw(vertexAttr, colorAttr, modelUniform, coordFrame) {
        /* copy the coordinate frame matrix to the uniform memory in shader */
        gl.uniformMatrix4fv(modelUniform, false, coordFrame);

        /* binder the (vertex+color) buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuff);

        /* with the "packed layout"  (x,y,z,r,g,b),
         the stride distance between one group to the next is 24 bytes */
        gl.vertexAttribPointer(vertexAttr, 3, gl.FLOAT, false, 24, 0); /* (x,y,z) begins at offset 0 */
        gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, false, 24, 12); /* (r,g,b) begins at offset 12 */

        for (let k = 0; k < this.indices.length; k++) {
            let obj = this.indices[k];
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.buffer);
            gl.drawElements(obj.primitive, obj.numPoints, gl.UNSIGNED_BYTE, 0);
        }
    }
}
