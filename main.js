/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMinteraction/gameboard.js":
/*!*****************************************!*\
  !*** ./src/DOMinteraction/gameboard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGameboard: () => (/* binding */ renderGameboard),\n/* harmony export */   resetGameboard: () => (/* binding */ resetGameboard),\n/* harmony export */   resetShipsContainer: () => (/* binding */ resetShipsContainer)\n/* harmony export */ });\n/* harmony import */ var _models_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Ship */ \"./src/models/Ship.js\");\n\r\n\r\n// const ship1 = new Ship(\"carrier\", 4, \"y\", [12, 22, 32, 42]);\r\n// const ship2 = new Ship(\"battleship\", 3, \"x\", [24, 25, 26]);\r\n// gameboard[12].ship = {\r\n//   isStartCoord: true,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[22].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[32].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[42].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[24].ship = {\r\n//   isStartCoord: true,\r\n//   shipObj: ship2,\r\n// };\r\n// gameboard[25].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship2,\r\n// };\r\n// gameboard[26].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship2,\r\n// };\r\n\r\nconst renderCross = () => `\r\n                          <div class=\"cross-container\">\r\n                            <div class=\"horizontal\"></div>\r\n                            <div class=\"vertical\"></div>\r\n                          </div>\r\n                          `;\r\n\r\nconst renderShip = (ship) => {\r\n  const shipCells = [];\r\n  const shipAxis = ship.axis === \"x\" ? \"draggable-x\" : \"draggable-y\";\r\n  const dragged = ship.coords.length !== 0 ? \"dragged\" : \"\";\r\n  let shipStyle;\r\n  if (ship.axis === \"x\") {\r\n    shipStyle = `style=\"grid-template-columns: repeat(${ship.shipLength}, var(--cell-width));\"`;\r\n  } else {\r\n    shipStyle = `style=\"grid-template-rows: repeat(${ship.shipLength}, var(--cell-width));\"`;\r\n  }\r\n\r\n  for (let i = 0; i < ship.shipLength; i += 1) {\r\n    const cell = `<div class=\"ship-cell\"></div>`;\r\n    shipCells.push(cell);\r\n  }\r\n\r\n  const shipContainer = `\r\n    <div class=\"draggable ${dragged} ${shipAxis}\" \r\n     ${shipStyle} name=\"${ship.name}\" draggable=\"true\">\r\n      ${shipCells.join(\"\")}\r\n    </div>\r\n  `;\r\n\r\n  return shipContainer;\r\n};\r\n\r\n// const renderCells = (container) => {\r\n\r\n// };\r\n\r\nconst renderGameboard = (container, grid) => {\r\n  container.innerHTML = \"\";\r\n\r\n  for (let row = 0; row < grid.length; row += 1) {\r\n    for (let col = 0; col < grid[0].length; col += 1) {\r\n      let shipElem = \"\";\r\n      if (grid[row][col].ship?.isStartCoord) {\r\n        shipElem = renderShip(c.ship.shipObj);\r\n      }\r\n\r\n      const cell = `<div class=\"cell\" row=\"${row}\" col=\"${col}\">${shipElem}</div>`;\r\n      container.innerHTML += cell;\r\n    }\r\n  }\r\n\r\n  // gameboard.forEach((c, i) => {\r\n  //   let shipElem;\r\n  //   if (c.ship?.isStartCoord) {\r\n  //     shipElem = renderShip(c.ship.shipObj);\r\n  //   } else {\r\n  //     shipElem = \"\";\r\n  //   }\r\n\r\n  //   const cell = `<div class=\"cell\" coord=\"${i}\">${shipElem}</div>`;\r\n  //   container.innerHTML += cell;\r\n  // });\r\n};\r\n\r\nconst resetShipsContainer = (container, allShips) => {\r\n  container.innerHTML = \"\";\r\n  container.innerHTML += `\r\n                        <div class=\"ship-row\">\r\n                            <div class=\"carrier-container ship-container\" name=\"carrier\">\r\n                                <div class=\"draggable draggable-x\" name=\"carrier\" draggable=\"true\" style=\"grid-template-columns: repeat(4, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"ship-row\">\r\n                            <div class=\"battleship-container ship-container\" name=\"battleship1\">\r\n                                <div class=\"draggable draggable-x\" name=\"battleship1\" draggable=\"true\" style=\"grid-template-columns: repeat(3, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"battleship-container ship-container\" name=\"battleship2\">        \r\n                                <div class=\"draggable draggable-x\" name=\"battleship2\" draggable=\"true\" style=\"grid-template-columns: repeat(3, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"ship-row\">\r\n                            <div class=\"submarine-container ship-container\" name=\"submarine1\">\r\n                                <div class=\"draggable draggable-x\" name=\"submarine1\" draggable=\"true\" style=\"grid-template-columns: repeat(2, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"submarine-container ship-container\" name=\"submarine2\">\r\n                                <div class=\"draggable draggable-x\" name=\"submarine2\" draggable=\"true\" style=\"grid-template-columns: repeat(2, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"submarine-container ship-container\" name=\"submarine3\">\r\n                                <div class=\"draggable draggable-x\" name=\"submarine3\" draggable=\"true\" style=\"grid-template-columns: repeat(2, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"ship-row\">\r\n                            <div class=\"destroyer-container ship-container\" name=\"destroyer1\">\r\n                                <div class=\"draggable draggable-x\" name=\"destroyer1\" draggable=\"true\" style=\"grid-template-columns: repeat(1, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"destroyer-container ship-container\" name=\"destroyer2\">\r\n                                <div class=\"draggable draggable-x\" name=\"destroyer2\" draggable=\"true\" style=\"grid-template-columns: repeat(1, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"destroyer-container ship-container\" name=\"destroyer3\">\r\n                                <div class=\"draggable draggable-x\" name=\"destroyer3\" draggable=\"true\" style=\"grid-template-columns: repeat(1, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"destroyer-container ship-container\" name=\"destroyer4\">\r\n                                <div class=\"draggable draggable-x\" name=\"destroyer4\" draggable=\"true\" style=\"grid-template-columns: repeat(1, var(--cell-width));\">\r\n                                    <div class=\"ship-cell\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n  `;\r\n};\r\n\r\nconst resetGameboard = (container, gameboard) => {\r\n  gameboard.initiateGameboard();\r\n  renderGameboard(container, gameboard.grid);\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/DOMinteraction/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOMinteraction_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMinteraction/gameboard */ \"./src/DOMinteraction/gameboard.js\");\n/* harmony import */ var _models_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Gameboard */ \"./src/models/Gameboard.js\");\n\r\n\r\n\r\n\r\nconst gameboardGrid = document.querySelector(\".main-grid\");\r\nconst newGameboard = new _models_Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nnewGameboard.initiateGameboard();\r\n\r\n(0,_DOMinteraction_gameboard__WEBPACK_IMPORTED_MODULE_0__.renderGameboard)(gameboardGrid, newGameboard.grid);\r\n\r\nlet shipsContainer = document.querySelector(\".ships-container\");\r\nlet draggables = document.querySelectorAll(\".draggable\");\r\nlet cells = document.querySelectorAll(\".cell\");\r\n\r\nlet distanceFromMidToMouse = [];\r\nlet initialX;\r\nlet initialY;\r\n\r\nconst getMeasurements = (e) => {\r\n  e.target.classList.add(\"dragging\");\r\n  const shipCells = e.target.querySelectorAll(\".ship-cell\");\r\n  shipCells.forEach((cell) => {\r\n    const box = cell.getBoundingClientRect();\r\n    const midCoord = [box.width / 2 + box.x, box.height / 2 + box.y];\r\n    distanceFromMidToMouse.push([\r\n      e.clientX - midCoord[0],\r\n      e.clientY - midCoord[1],\r\n    ]);\r\n  });\r\n};\r\n\r\nconst getElemAtPosition = (e, coord) => {\r\n  const clientXDistance = e.clientX - coord[0];\r\n  const clientYDistance = e.clientY - coord[1];\r\n  return document.elementFromPoint(clientXDistance, clientYDistance);\r\n};\r\n\r\nconst displayDraggablePositions = (e) => {\r\n  let hoveredCells = [];\r\n  // const [newX, newY] = [e.clientX, e.clientY];\r\n  // if (initialX === newX && initialY === newY) return;\r\n\r\n  // [initialX, initialY] = [newX, newY];\r\n  // e.target.classList.add(\"hide\");\r\n  distanceFromMidToMouse.forEach((d) => {\r\n    const elemAtPosition = getElemAtPosition(e, d);\r\n\r\n    if (elemAtPosition && elemAtPosition.classList.contains(\"cell\")) {\r\n      hoveredCells.push(elemAtPosition);\r\n    }\r\n  });\r\n\r\n  const shipLenth = e.target.querySelectorAll(\"*\").length;\r\n\r\n  if (hoveredCells.length === shipLenth) {\r\n    cells.forEach((cell) => {\r\n      if (!hoveredCells.includes(cell)) {\r\n        cell.classList.remove(\"red\");\r\n      } else {\r\n        cell.classList.add(\"red\");\r\n      }\r\n    });\r\n  } else {\r\n    cells.forEach((cell) => {\r\n      cell.classList.remove(\"red\");\r\n    });\r\n  }\r\n};\r\n\r\nconst placeShipOnBoard = (e) => {\r\n  // const clientXDistance = e.clientX - distanceFromMidToMouse[0][0];\r\n  // const clientYDistance = e.clientY - distanceFromMidToMouse[0][1];\r\n  // const elemAtPosition = document.elementFromPoint(\r\n  //   clientXDistance,\r\n  //   clientYDistance\r\n  // );\r\n  const elemAtPosition = getElemAtPosition(e, distanceFromMidToMouse[0]);\r\n\r\n  if (elemAtPosition.classList.contains(\"cell\")) {\r\n    elemAtPosition.appendChild(e.target);\r\n    e.target.classList.add(\"dragged\");\r\n  }\r\n\r\n  distanceFromMidToMouse = [];\r\n  cells.forEach((cell) => {\r\n    cell.classList.remove(\"red\");\r\n  });\r\n\r\n  e.target.classList.remove(\"dragging\", \"hide\");\r\n};\r\n\r\nconst setEventListeners = () => {\r\n  draggables.forEach((d) => {\r\n    d.addEventListener(\"dragstart\", getMeasurements);\r\n    d.addEventListener(\"drag\", displayDraggablePositions);\r\n    d.addEventListener(\"dragend\", placeShipOnBoard);\r\n  });\r\n\r\n  cells.forEach((cell) => {\r\n    cell.addEventListener(\"dragover\", (e) => e.preventDefault());\r\n  });\r\n};\r\n\r\nsetEventListeners();\r\n\r\nconst buttons = document.querySelectorAll(\".bottom-section-button\");\r\nbuttons.forEach((button) => {\r\n  button.addEventListener(\"click\", (e) => {\r\n    (0,_DOMinteraction_gameboard__WEBPACK_IMPORTED_MODULE_0__.resetGameboard)(gameboardGrid, newGameboard);\r\n    (0,_DOMinteraction_gameboard__WEBPACK_IMPORTED_MODULE_0__.resetShipsContainer)(shipsContainer);\r\n    shipsContainer = document.querySelector(\".ships-container\");\r\n    draggables = document.querySelectorAll(\".draggable\");\r\n    cells = document.querySelectorAll(\".cell\");\r\n    setEventListeners();\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/models/Gameboard.js":
/*!*********************************!*\
  !*** ./src/models/Gameboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/models/Ship.js\");\n\r\n\r\nclass Gameboard {\r\n  SIZE = 10;\r\n  grid = [];\r\n  allShips = {};\r\n\r\n  initiateGameboard() {\r\n    this.grid = [];\r\n    for (let i = 0; i < this.SIZE; i += 1) {\r\n      const row = [];\r\n      for (let j = 0; j < this.SIZE; j += 1) {\r\n        row.push({\r\n          markStatus: false,\r\n          ship: false,\r\n        });\r\n      }\r\n      this.grid.push(row);\r\n    }\r\n  }\r\n\r\n  placeShip(newShip, coords) {\r\n    coords.forEach((c, i) => {\r\n      const pos = this.grid[c[0]][c[1]];\r\n      pos.ship = {\r\n        isStartCoord: i === 0 ? true : false,\r\n        shipObj: newShip,\r\n      };\r\n    });\r\n\r\n    this.allShips[newShip.name] = newShip;\r\n    newShip.coords = coords;\r\n  }\r\n\r\n  getAdjacentsForAxisX(coords) {\r\n    const adjacents = [];\r\n\r\n    const head = [coords[0][0], coords[0][1] - 1];\r\n    const headNeighbor = [head[0] - 1, head[1]];\r\n    const tail = [coords[0][0], coords[coords.length - 1][1] + 1];\r\n    const tailNeighbor = [tail[0] + 1, tail[1]];\r\n\r\n    adjacents.push(head, headNeighbor, tail, tailNeighbor);\r\n\r\n    for (let i = 1; i !== coords.length + 2; i += 1) {\r\n      adjacents.push([headNeighbor[0], headNeighbor[1] + i]);\r\n      adjacents.push([tailNeighbor[0], tailNeighbor[1] - i]);\r\n    }\r\n\r\n    return adjacents;\r\n  }\r\n\r\n  getAdjacentsForAxisY(coords) {\r\n    const adjacents = [];\r\n\r\n    const head = [coords[0][0] - 1, coords[0][1]];\r\n    const headNeighbor = [head[0], head[1] - 1];\r\n    const tail = [coords[coords.length - 1][0] + 1, coords[0][1]];\r\n    const tailNeighbor = [tail[0], tail[1] + 1];\r\n\r\n    adjacents.push(head, headNeighbor, tail, tailNeighbor);\r\n\r\n    for (let i = 1; i !== coords.length + 2; i += 1) {\r\n      adjacents.push([headNeighbor[0], headNeighbor[1] + i]);\r\n      adjacents.push([tailNeighbor[0], tailNeighbor[1] - i]);\r\n    }\r\n\r\n    return adjacents;\r\n  }\r\n\r\n  AreCoordsInGrid(coords) {\r\n    const val = coords.some((c) => {\r\n      const row = this.grid[c[0]];\r\n      if (row && row[c[1]]) {\r\n        return false;\r\n      }\r\n      return true;\r\n    });\r\n\r\n    return !val;\r\n  }\r\n\r\n  isValidLocation(shipToPlace, coords) {\r\n    if (!this.AreCoordsInGrid(coords)) return false;\r\n\r\n    let coordsToCheck;\r\n    if (shipToPlace.axis === \"x\") {\r\n      coordsToCheck = [...this.getAdjacentsForAxisX(coords), ...coords];\r\n    } else {\r\n      coordsToCheck = [...this.getAdjacentsForAxisY(coords), ...coords];\r\n    }\r\n\r\n    // Check if at least one of the value in the adjacents array is invalid\r\n    const isInvalid = coordsToCheck.some((c) => {\r\n      const row = this.grid[c[0]];\r\n      const pos = row ? row[c[1]] : false;\r\n\r\n      return pos && pos.ship && pos.ship.shipObj.name !== shipToPlace.name;\r\n    });\r\n\r\n    return !isInvalid; // If none of them are invalid, the location is valid\r\n  }\r\n\r\n  receiveAttack(coord) {\r\n    console.log(this.grid, coord);\r\n  }\r\n\r\n  checkGameOver() {\r\n    console.log(this.grid);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/models/Gameboard.js?");

/***/ }),

/***/ "./src/models/Ship.js":
/*!****************************!*\
  !*** ./src/models/Ship.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n  numHits = 0;\r\n  coords = [];\r\n\r\n  constructor(name, shipLength, axis) {\r\n    this.name = name;\r\n    this.shipLength = shipLength;\r\n    this.axis = axis;\r\n  }\r\n\r\n  hit() {\r\n    this.numHits += 1;\r\n  }\r\n\r\n  isSunk() {\r\n    return this.numHits === this.shipLength;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/models/Ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;