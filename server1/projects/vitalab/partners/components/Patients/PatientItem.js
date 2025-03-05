import Link from "next/link";
// TODO PatientRow ref

export default function PatientItem({
  id,
  firstName,
  lastName,
  middleName,
  phone,
  birthday,
  gender,
  email,
  lastOrder,
  lastOrderCreated,
}) {
  return (
    <Link href={`/patients/${id}`} passHref legacyBehavior>
      <tr className="font-normal text-xs leading-5 border-t border-b border-gray-200 text-gray-900 cursor-pointer hover:bg-gray-50">
        <td className="font-normal h-[40px]">{phone}</td>
        <td className="font-normal h-[40px]">
          {lastName} {firstName} {middleName ? middleName : ""}
        </td>
        <td className="font-normal h-[40px]">{birthday || "-"}</td>
        <td className="font-normal h-[40px]">{gender}</td>
        <td className="font-normal h-[40px]">{email || "-"}</td>
        <td className="font-normal h-[40px]">
          {lastOrder ? `${lastOrder} (${lastOrderCreated})` : "-"}
        </td>
      </tr>
    </Link>
  );
}
