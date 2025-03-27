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
const getNodeColor = (title, isHighlighted) => {
  if (isHighlighted) return "bg-pink-600 text-white border-4 border-yellow-300";
  
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
const renderCustomNode = ({ nodeDatum, toggleNode, hierarchyPointNode }, highlightedNode) => {
  const isHighlighted = highlightedNode === nodeDatum.name;
  const colorClass = getNodeColor(nodeDatum.attributes?.title, isHighlighted);

  return (
    <foreignObject width="250" height="150" x="-125" y="-60">
      <div
        onClick={toggleNode}
        className={`flex items-center gap-4 cursor-pointer ${colorClass} border border-gray-300 rounded-lg shadow-lg p-4 transition-all transform hover:scale-105 hover:shadow-2xl`}
      >
        {/* Circular Avatar with Initials */}
        <div className={`w-12 h-12 rounded-full ${isHighlighted ? 'bg-yellow-300' : 'bg-gray-200'} flex items-center justify-center text-lg font-bold ${isHighlighted ? 'text-pink-600' : 'text-gray-700'} border`}>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [treeData, setTreeData] = useState(orgChartData);

  // Adjust tree size dynamically based on container size
  useEffect(() => {
    if (treeContainerRef.current) {
      setDimensions({
        width: treeContainerRef.current.offsetWidth,
        height: treeContainerRef.current.offsetHeight,
      });
    }
  }, []);

  // Function to search for an employee in the tree
  const searchEmployee = (term) => {
    if (!term.trim()) {
      setHighlightedNode(null);
      return;
    }

    // Convert search term to lowercase for case-insensitive search
    const searchTermLower = term.toLowerCase();

    // Recursive function to find the employee
    const findEmployee = (node) => {
      if (node.name.toLowerCase().includes(searchTermLower)) {
        return node.name;
      }

      if (node.children) {
        for (const child of node.children) {
          const found = findEmployee(child);
          if (found) return found;
        }
      }

      return null;
    };

    const foundEmployee = findEmployee(treeData);
    setHighlightedNode(foundEmployee);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    searchEmployee(term);
  };

  return (
    <div
      ref={treeContainerRef}
      className="w-full h-screen bg-gradient-to-br from-blue-100 to-gray-50 overflow-hidden p-5"
    >
      {/* Search Bar */}
      <div className="relative mb-4 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search employee by name..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setHighlightedNode(null);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Tree Visualization */}
      <Tree
        data={treeData}
        orientation="vertical"
        collapsible={true}
        shouldCollapseNeighborNodes={false}
        translate={{ x: dimensions.width / 2, y: 100 }}
        pathFunc="diagonal"
        nodeSize={{ x: 260, y: 170 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        zoomable={true}
        initialDepth={Infinity}
        renderCustomNodeElement={(rd3tProps) => 
          renderCustomNode(rd3tProps, highlightedNode)
        }
      />
    </div>
  );
};

export default EmployeeTree;