export default function MedicalTestsList(props) {
  let arr = {};
  props.data.forEach((element) => {
    let makeKey = element.category_name;
    if (!arr[makeKey]) {
      arr[makeKey] = [];
    }

    arr[makeKey].push({ ...element });
  });

  const handleClick = (value) => {
    // console.log(value);
    props.onSelectTestsByCategory(value);
  };

  return (
    <>
      {Object.entries(arr).map(([key, value], i) => {
        // console.log(key);
        // value.map(({ id }) => console.log(id));
        // let x = value.forEach(({ id }) => id);
        return (
          <tr
            key={i}
            className="font-normal text leading-5 border-t border-b border-gray-200 text-gray-900 cursor-pointer hover:bg-gray-50"
            onClick={() => handleClick(value)}
          >
            <td className="font-normal h-[40px]">{key}</td>
          </tr>
        );
      })}
    </>
  );
}
