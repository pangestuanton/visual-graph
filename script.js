/* ============================================
   GRAPH ITERA CAMPUS NAVIGATOR
   JavaScript: Graph Data, Dijkstra, Rendering,
   Navigation, Building Directory, Settings
   ============================================ */

// ---------- 1. Graph Data ----------

var nodes = [
  { id: "Gedung A",  type: "regular", left: 35, top: 20 },
  { id: "Gedung B",  type: "regular", left: 50, top: 20 },
  { id: "Gedung C",  type: "regular", left: 22, top: 42 },
  { id: "Gedung D",  type: "regular", left: 38, top: 44 },
  { id: "Gedung E",  type: "regular", left: 78, top: 44 },
  { id: "Gedung F",  type: "regular", left: 68, top: 70 },
  { id: "GKU 1",     type: "gku",     left: 40, top: 72 },
  { id: "GKU 2",     type: "gku",     left: 55, top: 48 }
];

var edges = [
  { id: "E1",  from: "Gedung A", to: "Gedung B", weight: 120 },
  { id: "E2",  from: "Gedung B", to: "Gedung C", weight: 150 },
  { id: "E3",  from: "Gedung C", to: "Gedung D", weight: 130 },
  { id: "E4",  from: "Gedung D", to: "GKU 1",    weight: 180 },
  { id: "E5",  from: "GKU 1",    to: "GKU 2",    weight: 260 },
  { id: "E6",  from: "GKU 2",    to: "Gedung F",  weight: 170 },
  { id: "E7",  from: "Gedung F",  to: "Gedung E",  weight: 280 },
  { id: "E8",  from: "GKU 2",    to: "Gedung E",  weight: 300 },
  { id: "E9",  from: "Gedung D", to: "GKU 2",    weight: 240 },
  { id: "E10", from: "Gedung F",  to: "GKU 1",    weight: 330 }
];

// ---------- 2. Build Adjacency List ----------

function buildAdjacencyList() {
  var adj = {};
  nodes.forEach(function(n) {
    adj[n.id] = [];
  });
  edges.forEach(function(e) {
    adj[e.from].push({ node: e.to, weight: e.weight });
    adj[e.to].push({ node: e.from, weight: e.weight });
  });
  return adj;
}

var adjacencyList = buildAdjacencyList();

// ---------- 3. Dijkstra Algorithm ----------

function dijkstra(start, end) {
  var dist = {};
  var prev = {};
  var visited = {};
  var queue = [];

  nodes.forEach(function(n) {
    dist[n.id] = Infinity;
    prev[n.id] = null;
  });

  dist[start] = 0;
  queue.push({ node: start, cost: 0 });

  while (queue.length > 0) {
    queue.sort(function(a, b) { return a.cost - b.cost; });
    var current = queue.shift();

    if (visited[current.node]) continue;
    visited[current.node] = true;

    if (current.node === end) break;

    adjacencyList[current.node].forEach(function(neighbor) {
      if (!visited[neighbor.node]) {
        var newDist = dist[current.node] + neighbor.weight;
        if (newDist < dist[neighbor.node]) {
          dist[neighbor.node] = newDist;
          prev[neighbor.node] = current.node;
          queue.push({ node: neighbor.node, cost: newDist });
        }
      }
    });
  }

  var path = [];
  var node = end;
  while (node !== null) {
    path.unshift(node);
    node = prev[node];
  }

  if (dist[end] === Infinity) {
    return { path: [], distance: -1 };
  }

  return { path: path, distance: dist[end] };
}

// ---------- 4. DOM References ----------

var mapCanvas = document.getElementById("map-canvas");
var mapSvg = document.getElementById("map-svg");
var nodesContainer = document.getElementById("nodes-container");
var badgesContainer = document.getElementById("badges-container");
var startSelect = document.getElementById("start-select");
var destSelect = document.getElementById("dest-select");
var btnFind = document.getElementById("btn-find");
var btnReset = document.getElementById("btn-reset");
var resultBanner = document.getElementById("result-banner");
var resultText = document.getElementById("result-text");
var resultDistance = document.getElementById("result-distance");
var nodeInfoCard = document.getElementById("node-info");
var nodeInfoText = document.getElementById("node-info-text");
var edgeTableBody = document.getElementById("edge-table-body");
var hamburger = document.getElementById("hamburger");
var sidebar = document.getElementById("sidebar");
var sidebarOverlay = document.getElementById("sidebar-overlay");
var sidebarControls = document.getElementById("sidebar-controls");

// ---------- 5. Populate Dropdowns ----------

function populateDropdowns() {
  nodes.forEach(function(n) {
    var opt1 = document.createElement("option");
    opt1.value = n.id;
    opt1.textContent = n.id;
    startSelect.appendChild(opt1);

    var opt2 = document.createElement("option");
    opt2.value = n.id;
    opt2.textContent = n.id;
    destSelect.appendChild(opt2);
  });
  startSelect.value = "Gedung A";
  destSelect.value = "Gedung E";
}

// ---------- 6. Settings State ----------

var settings = {
  theme: "default",
  showBadges: true,
  showRoads: true,
  showGreen: true,
  showEdgeList: true,
  pathColor: "#bc0100",
  routeThickness: "normal"
};

// ---------- 7. Get Node Pixel Position ----------

function getNodeCenter(nodeId) {
  var n = nodes.find(function(node) { return node.id === nodeId; });
  if (!n) return { x: 0, y: 0 };

  var rect = mapCanvas.getBoundingClientRect();
  var headerHeight = 36;
  var usableHeight = rect.height - headerHeight;

  var x = (n.left / 100) * rect.width;
  var y = headerHeight + (n.top / 100) * usableHeight;

  return { x: x, y: y };
}

// ---------- 8. Render SVG Edges ----------

var currentShortestPath = [];

function renderEdges() {
  mapSvg.innerHTML = "";

  var normalWidth = settings.routeThickness === "thick" ? 8 : 5;
  var pathWidth = settings.routeThickness === "thick" ? 14 : 10;
  var glowWidth = settings.routeThickness === "thick" ? 24 : 18;

  // Draw road background paths
  if (settings.showRoads) {
    var roadGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    roadGroup.setAttribute("opacity", "0.35");
    edges.forEach(function(e) {
      var p1 = getNodeCenter(e.from);
      var p2 = getNodeCenter(e.to);
      var road = document.createElementNS("http://www.w3.org/2000/svg", "line");
      road.setAttribute("x1", p1.x);
      road.setAttribute("y1", p1.y);
      road.setAttribute("x2", p2.x);
      road.setAttribute("y2", p2.y);
      road.setAttribute("stroke", "#cbd5e1");
      road.setAttribute("stroke-width", "16");
      road.setAttribute("stroke-linecap", "round");
      roadGroup.appendChild(road);
    });
    mapSvg.appendChild(roadGroup);
  }

  // Draw normal route edges
  edges.forEach(function(e) {
    var p1 = getNodeCenter(e.from);
    var p2 = getNodeCenter(e.to);
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", p1.x);
    line.setAttribute("y1", p1.y);
    line.setAttribute("x2", p2.x);
    line.setAttribute("y2", p2.y);
    line.setAttribute("stroke", "#0ea5e9");
    line.setAttribute("stroke-width", normalWidth);
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("data-edge", e.id);
    mapSvg.appendChild(line);
  });

  // Draw shortest path edges on top
  if (currentShortestPath.length > 1) {
    var points = [];
    currentShortestPath.forEach(function(nodeId) {
      var p = getNodeCenter(nodeId);
      points.push(p.x + " " + p.y);
    });

    // Glow background
    var glow = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    glow.setAttribute("points", points.join(", "));
    glow.setAttribute("fill", "none");
    glow.setAttribute("stroke", settings.pathColor);
    glow.setAttribute("stroke-width", glowWidth);
    glow.setAttribute("stroke-linecap", "round");
    glow.setAttribute("stroke-linejoin", "round");
    glow.setAttribute("opacity", "0.25");
    mapSvg.appendChild(glow);

    // Main shortest path line
    var pathLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    pathLine.setAttribute("points", points.join(", "));
    pathLine.setAttribute("fill", "none");
    pathLine.setAttribute("stroke", settings.pathColor);
    pathLine.setAttribute("stroke-width", pathWidth);
    pathLine.setAttribute("stroke-linecap", "round");
    pathLine.setAttribute("stroke-linejoin", "round");
    pathLine.setAttribute("filter", "drop-shadow(4px 4px 0px rgba(0,0,0,1))");
    mapSvg.appendChild(pathLine);
  }
}

// ---------- 9. Render Node Elements ----------

function renderNodes() {
  nodesContainer.innerHTML = "";

  nodes.forEach(function(n) {
    var div = document.createElement("div");
    div.className = "node";
    div.setAttribute("data-node", n.id);

    div.style.left = n.left + "%";
    div.style.top = n.top + "%";
    div.style.transform = "translate(-50%, -50%)";

    if (currentShortestPath.indexOf(n.id) !== -1) {
      div.classList.add("active");
    }

    var dot = document.createElement("div");
    dot.className = "node-dot " + (n.type === "gku" ? "node-dot-gku" : "node-dot-regular");
    div.appendChild(dot);

    var label = document.createElement("div");
    label.className = "node-label";
    label.textContent = n.id;
    div.appendChild(label);

    div.addEventListener("click", function() {
      showNodeInfo(n.id);
    });

    nodesContainer.appendChild(div);
  });

  adjustNodePositions();
}

function adjustNodePositions() {
  var headerHeight = 36;
  var canvasHeight = mapCanvas.offsetHeight;
  var usableHeight = canvasHeight - headerHeight;

  var allNodes = nodesContainer.querySelectorAll(".node");
  allNodes.forEach(function(el) {
    var nodeId = el.getAttribute("data-node");
    var n = nodes.find(function(node) { return node.id === nodeId; });
    if (!n) return;

    var topPx = headerHeight + (n.top / 100) * usableHeight;
    var leftPx = (n.left / 100) * mapCanvas.offsetWidth;

    el.style.left = leftPx + "px";
    el.style.top = topPx + "px";
  });
}

// ---------- 10. Render Distance Badges ----------

function renderBadges() {
  badgesContainer.innerHTML = "";

  if (!settings.showBadges) return;

  edges.forEach(function(e) {
    var p1 = getNodeCenter(e.from);
    var p2 = getNodeCenter(e.to);

    var mx = (p1.x + p2.x) / 2;
    var my = (p1.y + p2.y) / 2;

    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len > 0) {
      var offsetX = -(dy / len) * 14;
      var offsetY =  (dx / len) * 14;
      mx += offsetX;
      my += offsetY;
    }

    var badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = e.weight + "m";
    badge.style.left = mx + "px";
    badge.style.top = my + "px";
    badge.style.transform = "translate(-50%, -50%)";

    badgesContainer.appendChild(badge);
  });
}

// ---------- 11. Render Edge List Table ----------

function renderEdgeTable() {
  edgeTableBody.innerHTML = "";

  edges.forEach(function(e) {
    var tr = document.createElement("tr");

    var tdEdge = document.createElement("td");
    tdEdge.textContent = e.id;
    tr.appendChild(tdEdge);

    var tdFrom = document.createElement("td");
    tdFrom.textContent = e.from;
    tr.appendChild(tdFrom);

    var tdTo = document.createElement("td");
    tdTo.textContent = e.to;
    tr.appendChild(tdTo);

    var tdDist = document.createElement("td");
    tdDist.className = "text-right";
    tdDist.textContent = e.weight;
    tr.appendChild(tdDist);

    edgeTableBody.appendChild(tr);
  });
}

// ---------- 12. Show Node Neighbors ----------

function showNodeInfo(nodeId) {
  var neighbors = adjacencyList[nodeId];
  if (!neighbors) return;

  var text = "Neighbors of " + nodeId + ":\n";
  var parts = neighbors.map(function(nb) {
    return nb.node + " (" + nb.weight + " m)";
  });
  text += parts.join(", ");

  nodeInfoText.textContent = text;
  nodeInfoCard.style.display = "block";
}

// ---------- 13. Find Shortest Path ----------

function findShortestPath() {
  var start = startSelect.value;
  var end = destSelect.value;

  if (start === end) {
    resultText.textContent = "Start and destination are the same building.";
    resultDistance.textContent = "";
    currentShortestPath = [];
    renderAll();
    return;
  }

  var result = dijkstra(start, end);

  if (result.distance === -1 || result.path.length === 0) {
    resultText.textContent = "No path found between " + start + " and " + end + ".";
    resultDistance.textContent = "";
    currentShortestPath = [];
    renderAll();
    return;
  }

  var pathStr = result.path.join(" → ");
  resultText.textContent = "Shortest path: " + pathStr;
  resultDistance.textContent = "Total distance: " + result.distance + " meters.";

  currentShortestPath = result.path;
  renderAll();
}

// ---------- 14. Reset ----------

function resetVisualization() {
  currentShortestPath = [];
  resultText.textContent = 'Select start and destination buildings, then click "Find Shortest Path".';
  resultDistance.textContent = "";
  nodeInfoCard.style.display = "none";
  startSelect.value = "Gedung A";
  destSelect.value = "Gedung E";
  renderAll();
}

// ---------- 15. Render All ----------

function renderAll() {
  renderEdges();
  renderNodes();
  renderBadges();
}

// ---------- 16. Mobile Sidebar Toggle ----------

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
}

function toggleSidebar() {
  sidebar.classList.toggle("open");
  sidebarOverlay.classList.toggle("active");
}

hamburger.addEventListener("click", toggleSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// ---------- 17. Section Navigation ----------

var navItems = document.querySelectorAll(".nav-item[data-section]");
var sections = document.querySelectorAll(".content-section");
var activeSection = "route-planner";

function switchSection(sectionName) {
  activeSection = sectionName;

  // Update nav active state
  navItems.forEach(function(item) {
    if (item.getAttribute("data-section") === sectionName) {
      item.classList.add("nav-item-active");
    } else {
      item.classList.remove("nav-item-active");
    }
  });

  // Show/hide sections
  sections.forEach(function(sec) {
    if (sec.id === "section-" + sectionName) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  // Show sidebar controls only for route planner
  if (sectionName === "route-planner") {
    sidebarControls.classList.remove("hidden");
  } else {
    sidebarControls.classList.add("hidden");
  }

  // Close mobile sidebar after nav click
  closeSidebar();

  // Re-render map after section switch (map may have been hidden)
  if (sectionName === "route-planner") {
    setTimeout(function() {
      renderAll();
    }, 50);
  }

  // Scroll to top of main content
  document.getElementById("main-content").scrollTop = 0;
}

navItems.forEach(function(item) {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    var section = this.getAttribute("data-section");
    switchSection(section);
  });
});

// ---------- 18. Building Directory ----------

var dirGrid = document.getElementById("dir-grid");
var dirSearch = document.getElementById("dir-search");
var dirFilterBtns = document.querySelectorAll(".dir-filter-btn");
var currentDirFilter = "all";

function renderBuildingDirectory() {
  var searchTerm = dirSearch.value.toLowerCase().trim();
  dirGrid.innerHTML = "";

  var filtered = nodes.filter(function(n) {
    // Filter by type
    if (currentDirFilter === "regular" && n.type !== "regular") return false;
    if (currentDirFilter === "gku" && n.type !== "gku") return false;

    // Filter by search
    if (searchTerm && n.id.toLowerCase().indexOf(searchTerm) === -1) return false;

    return true;
  });

  if (filtered.length === 0) {
    var empty = document.createElement("div");
    empty.className = "dir-empty";
    empty.textContent = "No buildings found matching your search.";
    dirGrid.appendChild(empty);
    return;
  }

  filtered.forEach(function(n) {
    var neighbors = adjacencyList[n.id];
    var degree = neighbors.length;

    // Card container
    var card = document.createElement("div");
    card.className = "dir-card";

    // Card header
    var header = document.createElement("div");
    header.className = "dir-card-header";

    var dot = document.createElement("div");
    dot.className = "dir-card-dot " + n.type;
    header.appendChild(dot);

    var name = document.createElement("div");
    name.className = "dir-card-name";
    name.textContent = n.id;
    header.appendChild(name);

    card.appendChild(header);

    // Card body
    var body = document.createElement("div");
    body.className = "dir-card-body";

    // Meta info
    var meta = document.createElement("div");
    meta.className = "dir-card-meta";

    var typeLabel = n.type === "gku" ? "GKU Building" : "Regular Building";

    var rows = [
      { label: "Type", value: typeLabel },
      { label: "Position", value: "left: " + n.left + "%, top: " + n.top + "%" },
      { label: "Degree", value: degree }
    ];

    rows.forEach(function(r) {
      var row = document.createElement("div");
      row.className = "dir-meta-row";

      var lbl = document.createElement("span");
      lbl.className = "dir-meta-label";
      lbl.textContent = r.label;
      row.appendChild(lbl);

      var val = document.createElement("span");
      val.className = "dir-meta-value";
      val.textContent = r.value;
      row.appendChild(val);

      meta.appendChild(row);
    });

    body.appendChild(meta);

    // Neighbors
    var nTitle = document.createElement("div");
    nTitle.className = "dir-card-neighbors-title";
    nTitle.textContent = "Connected To";
    body.appendChild(nTitle);

    var nList = document.createElement("div");
    nList.className = "dir-neighbor-list";

    neighbors.forEach(function(nb) {
      var item = document.createElement("div");
      item.className = "dir-neighbor-item";

      var nbName = document.createElement("span");
      nbName.textContent = nb.node;
      item.appendChild(nbName);

      var nbDist = document.createElement("span");
      nbDist.className = "dir-neighbor-dist";
      nbDist.textContent = nb.weight + " m";
      item.appendChild(nbDist);

      nList.appendChild(item);
    });

    body.appendChild(nList);
    card.appendChild(body);
    dirGrid.appendChild(card);
  });
}

// Search input
dirSearch.addEventListener("input", function() {
  renderBuildingDirectory();
});

// Filter buttons
dirFilterBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    currentDirFilter = this.getAttribute("data-filter");

    dirFilterBtns.forEach(function(b) {
      b.classList.remove("active");
    });
    this.classList.add("active");

    renderBuildingDirectory();
  });
});

// ---------- 19. System Settings ----------

// Theme
var themeRadios = document.querySelectorAll('input[name="theme"]');
themeRadios.forEach(function(radio) {
  radio.addEventListener("change", function() {
    settings.theme = this.value;
    applyTheme();
  });
});

function applyTheme() {
  document.body.classList.remove("theme-high-contrast", "theme-soft-map");
  if (settings.theme === "high-contrast") {
    document.body.classList.add("theme-high-contrast");
  } else if (settings.theme === "soft-map") {
    document.body.classList.add("theme-soft-map");
  }
  // Re-render to pick up color changes
  if (activeSection === "route-planner") {
    renderAll();
  }
}

// Toggle: Distance Badges
var toggleBadges = document.getElementById("toggle-badges");
toggleBadges.addEventListener("change", function() {
  settings.showBadges = this.checked;
  renderBadges();
});

// Toggle: Road Background Lines
var toggleRoads = document.getElementById("toggle-roads");
toggleRoads.addEventListener("change", function() {
  settings.showRoads = this.checked;
  renderEdges();
});

// Toggle: Green Fields
var toggleGreen = document.getElementById("toggle-green");
var greenField1 = document.getElementById("green-field-1");
var greenField2 = document.getElementById("green-field-2");
toggleGreen.addEventListener("change", function() {
  settings.showGreen = this.checked;
  greenField1.style.opacity = this.checked ? "0.4" : "0";
  greenField2.style.opacity = this.checked ? "0.4" : "0";
});

// Toggle: Edge List Table
var toggleEdgeList = document.getElementById("toggle-edgelist");
var edgeTableCard = document.getElementById("edge-table-card");
toggleEdgeList.addEventListener("change", function() {
  settings.showEdgeList = this.checked;
  edgeTableCard.style.display = this.checked ? "flex" : "none";
});

// Shortest Path Color
var pathColorRadios = document.querySelectorAll('input[name="path-color"]');
pathColorRadios.forEach(function(radio) {
  radio.addEventListener("change", function() {
    settings.pathColor = this.value;
    if (currentShortestPath.length > 1) {
      renderEdges();
    }
  });
});

// Route Thickness
var thicknessRadios = document.querySelectorAll('input[name="thickness"]');
thicknessRadios.forEach(function(radio) {
  radio.addEventListener("change", function() {
    settings.routeThickness = this.value;
    renderEdges();
  });
});

// Reset Settings
var btnResetSettings = document.getElementById("btn-reset-settings");
btnResetSettings.addEventListener("click", function() {
  // Restore defaults
  settings.theme = "default";
  settings.showBadges = true;
  settings.showRoads = true;
  settings.showGreen = true;
  settings.showEdgeList = true;
  settings.pathColor = "#bc0100";
  settings.routeThickness = "normal";

  // Update UI controls
  document.querySelector('input[name="theme"][value="default"]').checked = true;
  toggleBadges.checked = true;
  toggleRoads.checked = true;
  toggleGreen.checked = true;
  toggleEdgeList.checked = true;
  document.querySelector('input[name="path-color"][value="#bc0100"]').checked = true;
  document.querySelector('input[name="thickness"][value="normal"]').checked = true;

  // Apply
  applyTheme();
  greenField1.style.opacity = "0.4";
  greenField2.style.opacity = "0.4";
  edgeTableCard.style.display = "flex";
  renderAll();
});

// ---------- 20. Event Listeners ----------

btnFind.addEventListener("click", findShortestPath);
btnReset.addEventListener("click", resetVisualization);

// Re-render on window resize
var resizeTimeout;
window.addEventListener("resize", function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    if (activeSection === "route-planner") {
      renderAll();
    }
  }, 100);
});

// ---------- 21. Initialize ----------

function init() {
  populateDropdowns();
  renderEdgeTable();
  renderBuildingDirectory();
  renderAll();
}

init();
