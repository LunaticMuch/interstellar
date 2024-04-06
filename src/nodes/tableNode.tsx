import { Position, Handle } from "reactflow";

function TableNode({ id, data }) {
  return (
    <>
      <table className="border-separate rounded-lg border-2 border-black bg-white font-sans">
        <thead>
          <tr>
            <th className="rounded-t-md border-b-2 border-black bg-gray-200 p-2 font-extrabold">
              {id}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="relative">
                  {row}
                  <Handle
                    key={index}
                    className="border-3 h-2 w-2 bg-yellow-300 -right-2"
                    type="source"
                    id={index}
                    position={Position.Right}
                    isConnectable={false}
                  />
         
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Handle
        key={id}
        className="border-3 h-2 w-2 bg-red-300"
        type="target"
        id={id}
        position={Position.Left}
      />
    </>
  );
}

export default TableNode;
