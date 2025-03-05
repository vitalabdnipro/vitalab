export default function MedicalTestsListByCat({ data }) {
  if (!data) {
    return;
  }

  return (
    <>
      {data.map(({name}, i) => {
        return (
          <tr
            key={i}
            className="font-normal text leading-5 border-t border-b border-gray-200 text-gray-900 cursor-pointer hover:bg-gray-50"
          >
            <td className="font-normal h-[40px]">{name}</td>
          </tr>
        );
      })}
    </>
  );
  // <tr
  //   className="font-normal text leading-5 border-t border-b border-gray-200 text-gray-900 cursor-pointer hover:bg-gray-50"
  // >
  //   <td className="font-normal h-[40px]">test</td>
  // </tr>
}
