import logo from "../../assets/home/logo.svg";

export default function SearchHeader({ title }: { title: string }) {
  return (
    <header className="flex h-[52px] items-start px-5 pt-3">
      <h1>
        <img src={logo} alt="Chozy" className="h-[29px] w-20" />
        <span className="sr-only">{title}</span>
      </h1>
    </header>
  );
}
