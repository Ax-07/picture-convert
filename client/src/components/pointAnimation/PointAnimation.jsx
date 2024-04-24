import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const PointAnimation = () => {

  const svgRef = useRef(null);
  const numberOflines = 10;
  
  useEffect(() => {
    const svg = svgRef.current;
    const width = "350";
    const height = "50";

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Create a SVG filter with feGaussianBlur
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "shadow");
    const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    blur.setAttribute("stdDeviation", "0.15");
    filter.appendChild(blur);
    svg.appendChild(filter);

    const drawLine = (offset, rotation) => {
        let path = "";
        for (let i = 0; i < width; i++) {
            const y = height - Math.sin((i * offset * i /2 ) * (0.0130 + offset)) * 100;
            path += `${i === 0 ? "M" : "L"} ${i},${y} `;
        }

        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("d", path);
        line.setAttribute("stroke", "#000");
        line.setAttribute("stroke-width", 0.1 );
        line.setAttribute("fill", "none");
        line.setAttribute("transform", `rotate(${rotation})`);
        line.setAttribute("filter", "url(#shadow)"); // Apply the filter to the line
        svg.appendChild(line);
    }

    for (let i = 0; i < numberOflines; i++) {
        drawLine(i * 0.0004, i * (360 / numberOflines)- 180*i ); // Adjust the multiplier to change the amount of offset
        // drawLine(i * 0.0004, i * (360 / 10 * 2)-90);
    }

  }, []);

  return (
    <div style={{position: "absolute", top:"0", left:"0", transform: "rotate(00deg)", opacity:"0.5", width:"100%", height: "100%", display: "flex", zIndex: "-1"}}>
      <svg ref={svgRef} id="point-animation"></svg>
    </div>
  );
};
