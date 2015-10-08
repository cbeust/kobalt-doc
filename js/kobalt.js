//
// Nav bar
//

var content = [
  {
    url: "../home/index.html",
    title: "Home"
  },
  {
    url: "../documentation/index.html",
    title: "Documentation"
  },
  {
    url: "../plug-in/index.html",
    title: "A plug-in in 10mn"
  }
];

var before = '<div class="container-fluid">'
  + '  <div class="navbar-header">'
  + '    <a class="navbar-brand">Kobalt</a>'
  + '  </div>'
  + '  <div id="navbar" class="navbar-collapse collapse">'
  + '    <ul class="nav navbar-nav">'
  ;

var after = '</ul>'
  + '   </div><!--/.nav-collapse -->'
  + '  </div><!--/.container-fluid -->'
  + '</nav>'
  ;

function generateNavBar(index) {
  var result = before;
  for (var i = 0; i < content.length; i++) {
    var cls = "";
    if (index == i) {
      cls = 'class="active"';
    }
    var c = content[i];
    result += '<li ' + cls + '><a href="' + c.url + '">' + c.title + '</a></li>';
  }
  result += after;


  var navBarElement = document.getElementById("kobalt-navbar");
  navBarElement.innerHTML = result;
}

//
// Table of contents
//

function countersToHeading(counters) {
    var result = "";
    for (var i = 0; i < counters.length; i++) {
        if (i > 0) result = result + ".";
        result = result + counters[i];
    }
    return result;
}

function indentSection(count) {
    var result = "";
    for (var i = 0; i < count; i++) {
        result += "&nbsp;&nbsp;";
    }
    return result;
}

function rewriteSection(section, counters) {
    var result = "";
    result = result + countersToHeading(counters) + " - " + section.innerHTML;
    return result;
}

function generateToc() {
    var sections = document.getElementsByClassName("section");

    var toc = '';//<ul class="nav">\n';
    var counters = new Array();
    var currentLevel = 0;
    for (i = 0; i < sections.length; i++) {
        var section = sections[i];
        var nameNode = section.attributes["name"];
        var name = nameNode ? nameNode.nodeValue : i;
        var indentNode = section.attributes["indent"];
        var indent = indentNode ? indentNode.nodeValue : ".";
        var currentCounter = 0;
        var ind = indent.length;
        if (ind > currentLevel) {
            if (ind == 1) {
                toc += '<ul class="nav">\n';
            } else {
                toc += '<ul>\n';
            }
        } else if (ind < currentLevel) {
            toc += '</ul>\n';
        }
        toc += '<li><a href="#' + section.id + '">' + section.innerHTML + '</a></li>\n';
        currentLevel = ind;
    }
    toc += "</ul>\n";
    
    var tocId = "table-of-contents";
    var tocTag = document.getElementById(tocId);
    
    if (tocTag) {
        tocTag.innerHTML = toc;
    } else {
        console.log("Couldn't find an id " + tocId);
    }

}

function generateKobalt(index) {
  generateToc();
  generateNavBar(index);
}
