import Link from "next/link";

export default function Orders() {
  return (
    <div className="flex-1 overflow-y-auto max-h-screen">
      <div className="p-4">
        <div className="flex justify-between px-6 pt-6 pb-2">
          <div></div>
          <div className="flex items-center">
            <Link href="/orders/new">Новый заказ</Link>
          </div>
        </div>
        <section className="w-full mt-4 px-6">
          <div className="relative rounded border">
            <div className="align-middle inline-block min-w-full">
              <div className="relative">
                <div className="transition-opacity duration-300">
                  <table
                    className="w-full border-collapse table"
                    style={{ borderSpacing: 0 }}
                  >
                    <thead>
                      <tr>
                        <th className="p-3 px-4 text-left">
                          <span>#</span>
                        </th>
                        <th className="p-3 px-4 text-left">
                          <span>Создан</span>
                        </th>
                        <th className="p-3 px-4 text-left">
                          <span>Цена</span>
                        </th>
                        <th className="p-3 px-4 text-left">
                          <span>Статус</span>
                        </th>
                        <th className="p-3 px-4 text-left">
                          <span>Бланки</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="h-14 p-4 whitespace-nowrap border-t leading-5 text-gray-300 text-sm">
                          1
                        </td>
                        <td>2</td>
                        <td>3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
