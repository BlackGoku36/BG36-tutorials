document.write(`
<h3 class="sidebar-h"><a href="../../index.html">BG36-Tutorials</a></h3>
<p class="sidebar-sub">Armory</p>
<hr>
<button class="dropdown-btn">Get Started
    <i class="fa fa-caret-down"></i>
</button>
<div class="active dropdown-container">
    <a href="introduction.html">Introduction</a>
    <a href="setup.html">Setup</a>
    <a href="pitfalls_misconception.html">Pitfalls and misconceptions</a>
</div>
<button class="dropdown-btn">Basics
    <i class="fa fa-caret-down"></i>
</button>
<div class="dropdown-container">
    <a href="../Basics/trait.html">Trait</a>
    <a href="../Basics/canvas.html">Canvas</a>
    <a href="../Basics/navmesh.html">Navmesh</a>
    <a href="../Basics/tilesheet.html">Tilesheet</a>
</div>
<button class="dropdown-btn">Mechanism
    <i class="fa fa-caret-down"></i>
</button>
<div class="dropdown-container">
    <a href="#">Save/Load Game</a>
</div>
`);