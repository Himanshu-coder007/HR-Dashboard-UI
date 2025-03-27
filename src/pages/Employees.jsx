// src/components/EmployeeTree.jsx
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";

// Updated sample data with more fields
const orgChartData = {
  name: "Alejandro Moretti",
  attributes: {
    title: "CEO",
    email: "Alejandro.Moretti@example.com",
    phone: "+1-234-567-8900",
    department: "Management",
  },
  children: [
    {
      name: "Isabella Kovács",
      attributes: {
        title: "CTO",
        email: "Isabella.Kovács@example.com",
        phone: "+1-987-654-3210",
        department: "Technology",
      },
      children: [
        {
          name: "Luca Fernández",
          attributes: {
            title: "Finance Manager",
            email: "Luca.Fernández@example.com",
            phone: "+1-555-123-4567",
            department: "Finance",
          },
        },
        {
          name: "Hiroshi Takahashi",
          attributes: {
            title: "Accountant",
            email: "Hiroshi.Takahashi@example.com",
            phone: "+1-444-987-6543",
            department: "Finance",
          },
        },
        {
          name: "Amélie Dubois",
          attributes: {
            title: "Security Analyst",
            email: "Amélie.Dubois@example.com",
            phone: "+1-333-876-5432",
            department: "Security",
          },
        },
      ],
    },
    {
      name: "Nikolai Petrov",
      attributes: {
        title: "COO",
        email: "Nikolai.Petrov@example.com",
        phone: "+1-888-222-3333",
        department: "Operations",
      },
      children: [
        {
          name: "Leila Al-Farsi",
          attributes: {
            title: "Operations Manager",
            email: "Leila.Al.Farsi@example.com",
            phone: "+1-111-222-3334",
            department: "Operations",
          },
        },
        {
          name: "Elias Schneider",
          attributes: {
            title: "Logistics Coordinator",
            email: "Elias.Schneider@example.com",
            phone: "+1-222-333-4445",
            department: "Logistics",
          },
        },
      ],
    },
    {
      name: "Rafael Costa",
      attributes: {
        title: "CFO",
        email: "Rafael.Costa@example.com",
        phone: "+1-777-555-6666",
        department: "Finance",
      },
      children: [
        {
          name: "Ingrid Bjornsson",
          attributes: {
            title: "Treasury Head",
            email: "Ingrid.Bjornsson@example.com",
            phone: "+1-444-666-7777",
            department: "Finance",
          },
        },
        {
          name: "Karim Haddad",
          attributes: {
            title: "Risk Analyst",
            email: "Karim.Haddad@example.com",
            phone: "+1-999-888-7776",
            department: "Risk Management",
          },
        },
      ],
    },
  ],
};

// Node colors based on position
const getNodeColor = (title) => {
  switch (title) {
    case "CEO":
      return "bg-blue-600 text-white";
    case "CTO":
      return "bg-purple-500 text-white";
    case "COO":
      return "bg-green-500 text-white";
    case "CFO":
      return "bg-yellow-500 text-black";
    case "Finance Manager":
    case "Treasury Head":
      return "bg-teal-500 text-white";
    case "Accountant":
    case "Risk Analyst":
      return "bg-orange-400 text-white";
    case "Security Analyst":
    case "Logistics Coordinator":
      return "bg-red-500 text-white";
    case "Operations Manager":
      return "bg-indigo-500 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

// Avatar initials generator
const getInitials = (name) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials;
};

// Custom render function for tree nodes
const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  const colorClass = getNodeColor(nodeDatum.attributes?.title);

  return (
    <foreignObject width="250" height="150" x="-125" y="-60">
      <div
        onClick={toggleNode}
        className={`flex items-center gap-4 cursor-pointer ${colorClass} border border-gray-300 rounded-lg shadow-lg p-4 transition-all transform hover:scale-105 hover:shadow-2xl`}
      >
        {/* Circular Avatar with Initials */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700 border">
          {getInitials(nodeDatum.name)}
        </div>

        {/* Employee Info Card */}
        <div className="text-left">
          <h3 className="text-lg font-semibold">{nodeDatum.name}</h3>
          {nodeDatum.attributes?.title && (
            <p className="text-sm">{nodeDatum.attributes.title}</p>
          )}
          {nodeDatum.attributes?.email && (
            <p className="text-xs">
              📧{" "}
              <a
                href={`mailto:${nodeDatum.attributes.email}`}
                className="underline hover:text-blue-200"
              >
                {nodeDatum.attributes.email}
              </a>
            </p>
          )}
          {nodeDatum.attributes?.phone && (
            <p className="text-xs">📞 {nodeDatum.attributes.phone}</p>
          )}
          {nodeDatum.attributes?.department && (
            <p className="text-xs">🏢 {nodeDatum.attributes.department}</p>
          )}
        </div>
      </div>
    </foreignObject>
  );
};

const EmployeeTree = () => {
  const treeContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Adjust tree size dynamically based on container size
  useEffect(() => {
    if (treeContainerRef.current) {
      setDimensions({
        width: treeContainerRef.current.offsetWidth,
        height: treeContainerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div
      ref={treeContainerRef}
      className="w-full h-screen bg-gradient-to-br from-blue-100 to-gray-50 overflow-hidden p-5"
    >
      <Tree
        data={orgChartData}
        orientation="vertical"
        collapsible={true}
        shouldCollapseNeighborNodes={false} // Prevents auto-collapsing
        translate={{ x: dimensions.width / 2, y: 100 }}
        pathFunc="diagonal"
        nodeSize={{ x: 260, y: 170 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        zoomable={true}
        initialDepth={Infinity} // Expands all nodes by default
        renderCustomNodeElement={(rd3tProps) => renderCustomNode(rd3tProps)}
      />
    </div>
  );
};

export default EmployeeTree;