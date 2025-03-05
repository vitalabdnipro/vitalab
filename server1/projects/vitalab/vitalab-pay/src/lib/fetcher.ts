// export const fetcher = (...args: any[]): Promise<any> =>
//   fetch(...args).then((res) => res.json())

export const fetcher = async (url: string, { arg }: {}) => {
  const params = new URLSearchParams({
    id: arg.id,
  })

  const res = await fetch(`${url}?${params.toString()}`)

  return res.json()
}
