import { SHOPPING_TOOLS } from "../../data/homeData";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./ShoppingToolsRow.css";

export default function ShoppingToolsRow() {
  const ref = useScrollReveal();
  return (
    <section className="mz-shoprow mz-reveal" ref={ref}>
      <ul>
        {SHOPPING_TOOLS.map((tool) => (
          <li key={tool.title}>
            <a href={tool.href} target="_blank" rel="noreferrer">
              <img src={tool.img} alt={tool.alt} loading="lazy" />
              <h3>{tool.title}</h3>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
