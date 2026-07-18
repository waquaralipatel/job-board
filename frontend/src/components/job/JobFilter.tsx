import Input from "../ui/Input";
import Select from "../ui/Select";

type JobFilterProps = {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

const categories = [
  { label: "All Categories", value: "" },
  { label: "Engineering", value: "Engineering" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
];

export default function JobFilter({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: JobFilterProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Select
        value={category}
        options={categories}
        onChange={(e) => onCategoryChange(e.target.value)}
      />
    </div>
  );
}