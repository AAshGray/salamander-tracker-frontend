// Canvas functions
function createProcessingCanvas(width, height) {
    let canvas, ctx;

    if (typeof OffscreenCanvas !== 'undefined') {
        canvas = new OffscreenCanvas(width, height);
        ctx = canvas.getContext('2d');
    } else {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
    }
    
    return { canvas, ctx };
}

export function drawCentroidX(canvas, centroidX, centroidY, size = 10) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('2D context is not available.');
    }

    if (!isNaN(centroidX) && !isNaN(centroidY)) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centroidX - size, centroidY - size);
        ctx.lineTo(centroidX + size, centroidY + size);
        ctx.moveTo(centroidX - size, centroidY + size);
        ctx.lineTo(centroidX + size, centroidY - size);
        ctx.stroke();
    }
}

// color functions
function colorDistance(color1, color2) {
    return Math.sqrt(
        Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2)
    );
}

function calculateTargetColor(targetColor) {
    const r = (targetColor >> 16) & 0xFF;
    const g = (targetColor >> 8) & 0xFF;
    const b = targetColor & 0xFF;
    return { r, g, b };
}


// set up binary array
function imageToBinaryArray(imageData, targetColor, threshold) {
    const width = imageData.width;
    const height = imageData.height;
    const binaryArray = new Array(height);
    const targetColorObj = calculateTargetColor(targetColor);

    for (let y = 0; y < height; y++) {
        if (!binaryArray[y]) {
            binaryArray[y] = new Array(width);
        }
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            const distance = colorDistance({ r, g, b }, targetColorObj);
            binaryArray[y][x] = distance <= threshold ? 1 : 0;
        }
    }

    return binaryArray;
}

function dfs(x, y, group, directions, binaryArray, visited, width, height) {
    visited[y][x] = true;
    group.push({ x, y });
    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (binaryArray[ny][nx] === 1 && !visited[ny][nx]) {
                dfs(nx, ny, group, directions, binaryArray, visited, width, height);
            }
        }
    }
}

function findGroups(binaryArray) {
    const height = binaryArray.length;
    const width = binaryArray[0].length;
    const visited = Array.from({ length: height }, () => Array(width).fill(false));
    const groups = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (binaryArray[y][x] === 1 && !visited[y][x]) {
                const group = [];
                dfs(x, y, group, directions, binaryArray, visited, width, height);
                groups.push(group);
            }
        }
    }
    
    return groups;
}

function findCentroid(group) {
    const sum = group.reduce((acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        return acc;
    }, { x: 0, y: 0 });
    const centroidX = sum.x / group.length;
    const centroidY = sum.y / group.length;
    return { centroidX, centroidY };
}

function sortGroupsBySize(groups) {
    return groups.sort((a, b) => b.length - a.length);
}

export async function binarizeImage(imageBlob, targetColor, threshold) {
    const bitmap = await createImageBitmap(imageBlob);
    const { canvas: tempCanvas, ctx } = createProcessingCanvas(bitmap.width, bitmap.height);

    if (!ctx) throw new Error('2D context is not available.');
    ctx.drawImage(bitmap, 0, 0);

    const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    if (!imageData) throw new Error('Failed to get image data from canvas.');

    const binaryArray = imageToBinaryArray(imageData, targetColor, threshold);
    if (!binaryArray) throw new Error('Binarization failed.');

    const groups = findGroups(binaryArray);
    if (groups.length === 0) throw new Error('No groups found in binary image.');
    const sortedGroups = sortGroupsBySize(groups);
    const largestGroup = sortedGroups[0];

    const { centroidX, centroidY } = findCentroid(largestGroup);

    // Draw binary image to canvas element
    const canvas = drawBinaryCanvas(binaryArray, bitmap.width, bitmap.height);
    
    // Draw centroid X on canvas
    drawCentroidX(canvas, centroidX, centroidY);

    return canvas;
}

