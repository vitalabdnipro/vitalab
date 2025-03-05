export default function Test1() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center">
    //   <div className="m-auto">test</div>
    //   <div className="fixed inset-x-0 bottom-0 flex items-center justify-center bg-gray-200 py-4">
    //     test
    //   </div>
    // </div>
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>test</div>
      <div className="fixed inset-x-0 bottom-0 bg-gray-200 py-4">
        <div className="mx-auto">test</div>
      </div>
    </div>
  )
}
