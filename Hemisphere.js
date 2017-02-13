/**
 * Created by nickfrein on 2/12/17.
 */

class Hemisphere {
    /**
     * Create a 3D cone with tip at the Z+ axis and base on the XY plane
     * @param {Object} gl      the current WebGL context
     * @param {Number} radius  radius of the cone base
     * @param {Number} height  height of the cone
     * @param {Number} subDiv  number of radial subdivision of the cone base
     * @param {vec3}   col1    color #1 to use
     * @param {vec3}   col2    color #2 to use
     */
    constructor (gl, radius, height, subDiv, vertSubDiv, col1, col2) {

        /* if colors are undefined, generate random colors */
        if (typeof col1 === "undefined") col1 = vec3.fromValues(Math.random(), Math.random(), Math.random());
        if (typeof col2 === "undefined") col2 = vec3.fromValues(Math.random(), Math.random(), Math.random());
        let randColor = vec3.create();
        let vertices = [];
        this.vbuff = gl.createBuffer();

        let count = 0;

        /* Instead of allocating two separate JS arrays (one for position and one for color),
         in the following loop we pack both position and color
         so each tuple (x,y,z,r,g,b) describes the properties of a vertex
         */
        //radius=0.1;
        //vertSubDiv=5;
        //subDiv=5;
        
        // Top half of Sphere
        for(let j = 0; j < vertSubDiv; j++) {
            // One latitudinal triangle strip.
            for(let i = 0; i <= subDiv; i++) {
                vertices.push((radius * Math.cos((j + 1.0) / vertSubDiv * (Math.PI) / 2.0) * Math.cos(2.0 * i / subDiv * (Math.PI))),
                    (radius * Math.sin((j + 1.0) / vertSubDiv * (Math.PI) / 2.0)),
                        (radius * Math.cos((j + 1.0) / vertSubDiv * (Math.PI) / 2.0) * Math.sin(2.0 * i / subDiv * (Math.PI))));
                vec3.lerp (randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);

                vertices.push((radius * Math.cos(j / vertSubDiv * (Math.PI) / 2.0) * Math.cos(2.0 * i / subDiv * (Math.PI))),
                    (radius * Math.sin(j / vertSubDiv * (Math.PI) / 2.0)),
                    (radius * Math.cos(j / vertSubDiv * (Math.PI) / 2.0) * Math.sin(2.0 * i / subDiv * (Math.PI))));
                vec3.lerp (randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);

                count++;
                count++;
            }
        }

        // Bottom half of Sphere
        for(let j = 0; j < vertSubDiv; j++) {
            // One latitudinal triangle strip.
            for(let i = 0; i <= subDiv; i++) {
                vertices.push(-(radius * Math.cos((j + 1.0) / vertSubDiv * (Math.PI) / 2.0) * Math.cos(2.0 * i / subDiv * (Math.PI))),
                    -(radius * Math.sin((j + 1.0) / vertSubDiv * (Math.PI) / 2.0)),
                    (radius * Math.cos((j + 1.0) / vertSubDiv * (Math.PI) / 2.0) * Math.sin(2.0 * i / subDiv * (Math.PI))));
                vec3.lerp (randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);

                vertices.push(-(radius * Math.cos(j / vertSubDiv * (Math.PI) / 2.0) * Math.cos(2.0 * i / subDiv * (Math.PI))),
                    -(radius * Math.sin(j / vertSubDiv * (Math.PI) / 2.0)),
                    (radius * Math.cos(j / vertSubDiv * (Math.PI) / 2.0) * Math.sin(2.0 * i / subDiv * (Math.PI))));
                vec3.lerp (randColor, col1, col2, Math.random());
                vertices.push(randColor[0], randColor[1], randColor[2]);

                count++;
                count++;
            }
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuff);
        gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(vertices), gl.STATIC_DRAW);




        // Generate index order for bottom of cone
        let topIndex = [];
        /*for (let m = 0; m < count/2; m++)
            topIndex.push(m);
*/
        for (let m = 0; m < count/2; m++)
            topIndex.push(m);
        let botIndex = [];
        /*for (let m = count-1; m >=count/2; m--)
            botIndex.push(m);*/
        for (let m = count/2; m < count; m++)
            botIndex.push(m);


        this.topIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(topIndex), gl.STATIC_DRAW);

        // Generate index order for bottom of cone

        /*for (let m = 0; m < count; m++)
            botIndex.push(m);*/
        this.botIdxBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.botIdxBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint8Array.from(botIndex), gl.STATIC_DRAW);

        /* Put the indices as an array of objects. Each object has three attributes:
         primitive, buffer, and numPoints */

        this.indices = [{"primitive": gl.TRIANGLE_STRIP, "buffer": this.topIdxBuff, "numPoints": topIndex.length},
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
