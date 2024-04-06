import type { NodeTypes, Edge } from "reactflow";
import TableNode from "./tableNode";
import { getTypes } from "./fetcher";

function unwrapType(type) {
  switch (type.kind) {
    case "NON_NULL":
      return unwrapType(type.ofType);
    case "LIST":
      return unwrapType(type.ofType);
    default:
      return type;
  }
}

const allTypes = await getTypes();

// Build the custom node information
export const initialNodes = allTypes
  .map((type, index) => {
    if (
      type.kind !== "SCALAR" &&
      type.kind !== "ENUM" &&
      !type.name.startsWith("__")
    ) {
      return {
        id: type.name,
        type: "tableNode",
        position: { x: 10, y: 10 },
        data: type.fields.map((field) => {
          const unwrappedFieldType = unwrapType(field.type);
          let isBoundToObject = true;
          if (
            unwrappedFieldType.kind === "SCALAR" ||
            unwrappedFieldType.kind === "ENUM"
          ) {
            isBoundToObject = false;
          }
          return { name: field.name, isBoundToObject: isBoundToObject };
        }),
      };
    }
  })
  .filter((item) => item);

// All edges are standard, no custom
// export const initialEdges = [
//   { id: "id1", source: "Vehicle", sourceHandle:"pilotConnection", target: "VehiclePilotsConnection", animated: true },
// ] satisfies Edge[];

export const initialEdges = allTypes
  .map((type) => {
    if (
      type.kind !== "SCALAR" &&
      type.kind !== "ENUM" &&
      !type.name.startsWith("__")
    ) {
      return type.fields
        .map((field) => {
          const unwrappedFieldType = unwrapType(field.type);
          if (
            unwrappedFieldType.kind !== "SCALAR" &&
            unwrappedFieldType.kind !== "ENUM"
          ) {
            return {
              id: `${type.name}-${field.name}`,
              source: type.name,
              sourceHandle: field.name,
              target: unwrappedFieldType.name,
              animated: true,
            };
          }
        })
        .filter((item) => item);
    }
  })
  .filter((item) => item)
  .reduce((elem1, elem2) => elem1.concat(elem2));


export const nodeTypes = {
  tableNode: TableNode,
} satisfies NodeTypes;
