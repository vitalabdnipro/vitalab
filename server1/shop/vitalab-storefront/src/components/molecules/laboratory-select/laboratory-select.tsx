import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"

const labs = [
  {
    label: "КП «ДБКЛ з надання психіатричної допомоги» ДОР»",
    value: "test111",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab' м. Нікополь",
    value: "test2111",
  },
]

const LaboratorySelect = (props) => {
  const { field, handleChange } = props

  return (
    <Select
      onValueChange={(value: string) => handleChange(value, field.onChange)}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Виберіть лабораторію..." />
      </SelectTrigger>
      <SelectContent className="ml-6" align="end">
        {labs.map((lab) => (
          <SelectItem value={lab.value}>{lab.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { LaboratorySelect }
