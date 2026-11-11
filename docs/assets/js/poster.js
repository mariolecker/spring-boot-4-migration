// Fills the header "4" with real Spring Boot 4 module names.
// Without JavaScript the glyph still shows as a solid outline.
(function () {
  "use strict";

  var modules = [
    "webmvc", "jackson", "flyway", "data-jpa", "security", "actuator", "kafka",
    "webflux", "restclient", "liquibase", "data-redis", "opentelemetry", "validation",
    "jdbc", "data-mongodb", "graphql", "amqp", "micrometer-metrics", "thymeleaf",
    "tomcat", "jetty", "webclient", "cache", "batch", "quartz", "mail", "jooq",
    "r2dbc", "data-jdbc", "data-elasticsearch", "data-cassandra", "data-neo4j",
    "security-oauth2-client", "security-oauth2-resource-server", "security-saml2",
    "micrometer-tracing", "micrometer-observation", "health", "persistence",
    "h2console", "hateoas", "websocket", "rsocket", "pulsar", "jms", "artemis",
    "activemq", "integration", "session-jdbc", "kotlinx-serialization-json",
    "gson", "jsonb", "freemarker", "mustache", "reactor-netty", "aspectj",
    "webservices", "jersey", "ldap", "hazelcast", "couchbase", "zipkin", "restdocs"
  ];

  var group = document.getElementById("four-lines");
  var figure = document.getElementById("four");
  if (!group || !figure) return;

  var NS = "http://www.w3.org/2000/svg";
  var lineHeight = 17;
  var top = 14;
  var height = 640;
  var classes = ["mod-a", "mod-b", "mod-c"];
  var index = 0;
  var lineNo = 0;

  for (var y = top; y < height + lineHeight; y += lineHeight) {
    var line = document.createElementNS(NS, "text");
    line.setAttribute("x", String(-((lineNo * 37) % 120)));
    line.setAttribute("y", String(y));
    line.setAttribute("class", "mod mod-line");
    line.style.animationDelay = (lineNo * 22) + "ms";

    for (var k = 0; k < 7; k++) {
      var span = document.createElementNS(NS, "tspan");
      span.setAttribute("class", classes[(index + lineNo) % classes.length]);
      span.textContent = "spring-boot-" + modules[index % modules.length] + "  ";
      line.appendChild(span);
      index++;
    }
    group.appendChild(line);
    lineNo++;
  }

  // Print as a single page sized to the poster.
  var pageStyle = document.createElement("style");
  document.head.appendChild(pageStyle);
  window.addEventListener("beforeprint", function () {
    var poster = document.querySelector(".poster");
    var previous = poster.style.width;
    poster.style.width = "1600px";
    var h = Math.ceil(poster.getBoundingClientRect().height) + 24;
    poster.style.width = previous;
    pageStyle.textContent = "@page { size: 1600px " + h + "px; margin: 0; }";
  });

  var reduce =window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) figure.classList.add("is-animated");
})();
