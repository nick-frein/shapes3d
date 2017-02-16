/**
 * Created by nickfrein on 2/11/17.
 */
/**
 * Create a 3D cylinder with tip at the Z+ axis and base on the XY plane
 * @param {Object} gl      the current WebGL context
 * @param {vec3}   col1    color #1 to use
 * @param {vec3}   col2    color #2 to use
 */
class RecursiveSphere {
    constructor (gl, rsphereSubDiv, col1, col2) {

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



        let v1x = 0.5;
        let v1y = 0.5;
        let v1z = 0.5;

        let v2x = -0.5;
        let v2y = -0.5;
        let v2z = 0.5;

        let v3x = -0.5;
        let v3y = 0.5;
        let v3z = -0.5;

        let v4x = 0.5;
        let v4y = -0.5;
        let v4z = -0.5;

        let level = 3;
        level = rsphereSubDiv;


        vertices.push(v1x, v1y, v1z);  //A
        vec3.lerp (randColor, col1, col2, Math.random());
        vertices.push(randColor[0], randColor[1], randColor[2]);
        vertices.push(v2x, v2y, v2z);  //B
        vec3.lerp (randColor, col1, col2, Math.random());
        vertices.push(randColor[0], randColor[1], randColor[2]);
        vertices.push(v3x, v3y, v3z);  //C
        vec3.lerp (randColor, col1, col2, Math.random());
        vertices.push(randColor[0], randColor[1], randColor[2]);
        vertices.push(v4x, v4y, v4z);  //C
        vec3.lerp (randColor, col1, col2, Math.random());
        vertices.push(randColor[0], randColor[1], randColor[2]);
        let count = 0;
        count++;
        count++;
        count++;
        count++;



        function subDivide(v1x, v1y, v1z,
                           v2x, v2y, v2z,
                           v3x, v3y, v3z,
                           level) {

            if(level==0){
                //return;
            }else {
                // Calculate middle of first edge...
                let v12x = 0.5 * (v1x + v2x);
                let v12y = 0.5 * (v1y + v2y);
                let v12z = 0.5 * (v1z + v2z);
                // ... and renormalize it to get a point on the sphere.
                let s = 1.0 / Math.sqrt(v12x * v12x + v12y * v12y + v12z * v12z);
                v12x *= s;
                v12y *= s;
                v12z *= s;
                vertices.push(v12x, v12y, v12z);  //A
                vec3.lerp (randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);
                count++;

                let v13x = 0.5 * (v1x + v3x);
                let v13y = 0.5 * (v1y + v3y);
                let v13z = 0.5 * (v1z + v3z);
                s = 1.0 / Math.sqrt(v13x * v13x + v13y * v13y + v13z * v13z);
                v13x *= s;
                v13y *= s;
                v13z *= s;
                vertices.push(v13x, v13y, v13z);  //A
                vec3.lerp (randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);
                count++;

                let v23x = 0.5 * (v2x + v3x);
                let v23y = 0.5 * (v2y + v3y);
                let v23z = 0.5 * (v2z + v3z);
                s = 1.0 / Math.sqrt(v23x * v23x + v23y * v23y + v23z * v23z);
                v23x *= s;
                v23y *= s;
                v23z *= s;
                vertices.push(v23x, v23y, v23z);  //A
                vec3.lerp (randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);
                count++;



                subDivide(v1x, v1y, v1z,
                    v12x, v12y, v12z,
                    v13x, v13y, v13z,
                    level - 1);
                subDivide(v12x, v12y, v12z,
                    v2x, v2y, v2z,
                    v23x, v23y, v23z,
                    level - 1);
                subDivide(v13x, v13y, v13z,
                    v23x, v23y, v23z,
                    v3x, v3y, v3z,
                    level - 1);
                subDivide(v12x, v12y, v12z,
                    v23x, v23y, v23z,
                    v13x, v13y, v13z,
                    level - 1);
            }
        }

        subDivide(v1x, v1y, v1z,
            v2x, v2y, v2z,
            v3x, v3y, v3z,
            level);

        subDivide(v1x, v1y, v1z,
            v2x, v2y, v2z,
            v4x, v4y, v4z,
            level);

        subDivide(v2x, v2y, v2z,
            v3x, v3y, v3z,
            v4x, v4y, v4z,
            level);

        subDivide(v1x, v1y, v1z,
            v3x, v3y, v3z,
            v4x, v4y, v4z,
            level);


        /* copy the (x,y,z,r,g,b) sixtuplet into GPU buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuff);
        gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(vertices), gl.STATIC_DRAW);

        let botIndex = [];
        for(let i=0;i< count;i++){
            botIndex.push(i);
        }


        let sideIndex = [];
        for(let i=count;i< count*2;i++){
            sideIndex.push(i);
        }


        let side2Index = [];
        for(let i=count*2;i< count*3;i++){
            side2Index.push(i);
        }


        let side3Index = [];
        for(let i=count*3;i< count*4;i++){
            side3Index.push(i);
        }

        this.topIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(botIndex), gl.STATIC_DRAW);

        this.sideIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sideIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(sideIndex), gl.STATIC_DRAW);

        this.side2IdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.side2IdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(side2Index), gl.STATIC_DRAW);

        this.side3IdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.side3IdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(side3Index), gl.STATIC_DRAW);




        /* Put the indices as an array of objects. Each object has three attributes:
         primitive, buffer, and numPoints */
        this.indices = [{"primitive": gl.POINTS, "buffer": this.topIdxBuff, "numPoints": botIndex.length},
            {"primitive": gl.POINTS, "buffer": this.sideIdxBuff, "numPoints": sideIndex.length},
            {"primitive": gl.POINTS, "buffer": this.side2IdxBuff, "numPoints": side2Index.length},
            {"primitive": gl.POINTS, "buffer": this.side3IdxBuff, "numPoints": side3Index.length}];

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