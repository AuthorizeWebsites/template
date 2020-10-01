import { ReactElement } from "react";

export function Layout({
  header,
  content,
  footer,
}: {
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}) {
  return (
    <div className="relative flex flex-col min-h-full">
      <header className="sticky top-0 z-30">{header}</header>
      <section>{content}</section>
      <div className="flex-1" />
      <footer>{footer}</footer>
    </div>
  );
}
