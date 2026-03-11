import { pageStructure } from "./build-in.js";

async function fetchHtml(filePath) {
  const response = await fetch(filePath);

  if (!response.ok) {
    throw new Error(`Failed to load component: ${filePath}`);
  }

  return response.text();
}

async function loadSingleComponent(targetId, filePath) {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    console.warn(`Target element not found: #${targetId}`);
    return;
  }

  try {
    const html = await fetchHtml(filePath);
    targetElement.innerHTML = html;
  } catch (error) {
    console.error(error);
    targetElement.innerHTML = `
      <p class="mx-auto max-w-7xl px-4 py-4 text-red-600">
        Could not load component: ${filePath}
      </p>
    `;
  }
}

async function loadMainSections(targetId, sectionFiles) {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    console.warn(`Target element not found: #${targetId}`);
    return;
  }

  targetElement.innerHTML = "";

  for (const filePath of sectionFiles) {
    try {
      const html = await fetchHtml(filePath);
      targetElement.insertAdjacentHTML("beforeend", html);
    } catch (error) {
      console.error(error);
      targetElement.insertAdjacentHTML(
        "beforeend",
        `
        <section class="mx-auto max-w-7xl px-4 py-4">
          <p class="text-red-600">Could not load section: ${filePath}</p>
        </section>
        `,
      );
    }
  }
}

async function buildPage() {
  await loadSingleComponent(
    pageStructure.header.targetId,
    pageStructure.header.file,
  );

  await loadMainSections(
    pageStructure.main.targetId,
    pageStructure.main.sections,
  );

  await loadSingleComponent(
    pageStructure.footer.targetId,
    pageStructure.footer.file,
  );
}

buildPage();
