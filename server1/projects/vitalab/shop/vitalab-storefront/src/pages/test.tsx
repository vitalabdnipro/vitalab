const Test = () => {
  const categoryExist = (array: any, id: string) =>
    array.find((c: any) => c.id === id)

  const products = [
    {
      id: "744d7aceec694b8184c256fb05b463fd555",
      code: "837",
      name: "ДНК Сytomegalovirus +  Herpes simplex virus I і II типів,кров -  якісне визначення",
      category_name: "TORCH-інфекції",
      price: 44000,
      description: "",
      type: "TEST",
      container_name: "кров з  ЕДТА",
      container_color: "FF00FF",
      is_active: 1,
      manipulation_id: "937",
      manipulation_name: "Забір біоматеріалу (крові)",
      category_tree: {
        category: {
          id: "56",
          name: "Інфекційна панель1",
          category: {
            id: "49",
            name: "TORCH-інфекції",
            // category: { id: "49", name: "BLABL11111A" },
          },
        },
      },
    },
    {
      id: "6634525e0cc44ce9aaa8e7befad93907",
      code: "83703",
      name: "ДНК Сytomegalovirus +  Herpes simplex virus I і II типів, генітальний зішкріб, якісне визначення",
      category_name: "TORCH-інфекції",
      price: 44000,
      description: "",
      type: "TEST",
      container_name: "епендорф з транспортним середовищем для ПЛР",
      container_color: "FFFFFF",
      is_active: 1,
      manipulation_id: null,
      manipulation_name: null,
      category_tree: {
        category: {
          id: "56",
          name: "Інфекційна панель",
          category: {
            id: "49",
            name: "TORCH-інфекції2",
            category: { id: "49", name: "BLABLA" },
          },
        },
      },
    },
    {
      id: "6634525e0cc44ce9aaa8e7befad93907",
      code: "83703",
      name: "ДНК Сytomegalovirus +  Herpes simplex virus I і II типів, генітальний зішкріб, якісне визначення",
      category_name: "TORCH-інфекції",
      price: 44000,
      description: "",
      type: "TEST",
      container_name: "епендорф з транспортним середовищем для ПЛР",
      container_color: "FFFFFF",
      is_active: 1,
      manipulation_id: null,
      manipulation_name: null,
      category_tree: {
        category: {
          id: "56",
          name: "Інфекційна панель",
          category: { id: "49", name: "TORCH-інфекції2" },
        },
      },
    },
  ]
  const array: any = []
  const set1 = new Set([])

  for (let index = 0; index < products.length; index++) {
    // array.push(products[index].category_tree.category)
    // array.push([products[index].category_tree.category.name])

    // if (!set1.has(products[index].category_tree.category.name)) {
    //   set1.add(products[index].category_tree.category.name)
    //   set1.add(products[index].category_tree.category.name)
    // }
    // array.find((c: any) => console.log("ccc", c))

    const i = array.findIndex((object) => {
      return object.name === products[index]?.category_tree.category.name
    })

    if (i > 0) {
      // console.log(i)
      if (Object.hasOwn(products[index].category_tree.category, "category")) {
        array[i].items = [
          {
            name: products[index].category_tree.category.category.name,
          },
        ]

        // if (products[index].category_tree.category.category.category !== null) {
        //   array[i].items.items = [
        //     {
        //       name: products[index].category_tree.category.category.category.name,
        //     },
        //   ]
        // }
      }
    } else {
      array.push({
        name: products[index]?.category_tree.category.name,
        items: null,
      })

      if (Object.hasOwn(products[index].category_tree.category, "category")) {
        array[index].items = [
          {
            name: products[index].category_tree.category.category.name,
          },
        ]

        // if (
        //   Object.hasOwn(
        //     products[index].category_tree.category.category,
        //     "category"
        //   )
        // ) {
        //   array[index].items.items = [
        //     {
        //       name: "111111111111111111",
        //     },
        //   ]
        // }

        // if (products[index].category_tree.category.category.category !== null) {
        //   array[i].items.items = [
        //     {
        //       name: products[index].category_tree.category.category.category.name,
        //     },
        //   ]
        // }
      }
    }

    // if (
    //   array.find(
    //     (c: any) => c.name === products[index].category_tree.category.name
    //   )
    // ) {
    //   // console.log("exist")
    //   if (products[index].category_tree.category.category !== null) {
    //     console.log(array[1])
    //     // array[index].items = [
    //     //   {
    //     //     name: products[index].category_tree.category.category.name,
    //     //   },
    //     // ]
    //   }
    // } else {
    //   // console.log("not exist")
    //   array.push({
    //     name: products[index].category_tree.category.name,
    //     items: null,
    //   })

    //   if (products[index].category_tree.category.category !== null) {
    //     // array[index].push({
    //     //   name: products[index].category_tree.category.category.name,
    //     // })
    //   }
    // }

    // if (products[index].category_tree.category.category !== null) {
    //   set1[index].items = [
    //     { name: products[index].category_tree.category.category.name },
    //   ]
    //   // array[index].push(products[index].category_tree.category.category.name)
    // }

    // console.log("test", array)

    // const e = categoryExist(array, products[index].category_tree.category.name)
    // console.log("e", e)
    // array[index] = { name: products[index].category_tree.category.name }
    // if (
    //   !array.some((e) => e.name === products[index].category_tree.category.name)
    // ) {
    //   array[index] = { name: products[index].category_tree.category.name }
    //   console.log(index)
    // }

    // if (
    //   array.lenght > 0 &&
    //   products[index].category_tree.category.category !== null
    // ) {
    //   array[index].items = [
    //     { name: products[index].category_tree.category.category.name },
    //   ]
    //   // array[index].push(products[index].category_tree.category.category.name)
    // }
    // // let result = Object.entries(products[index].category_tree.category).map(
    // //   (item) => {
    // //     if (item) {
    // //       console.log(item)
    // //     }
    // //   }
    // // )
    // console.log(array)
  }

  //   console.log(array)
}

export default Test
