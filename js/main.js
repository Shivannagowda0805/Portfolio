(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data || !data.owner || !Array.isArray(data.projects) || !Array.isArray(data.experience) || !Array.isArray(data.skills)) {
    console.error("Portfolio data is missing or malformed. Check js/data.js.");
    return;
  }

  const makeElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const safeExternalUrl = (value) => {
    if (typeof value !== "string" || value.trim() === "") return "";
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch {
      return "";
    }
  };

  const renderStats = () => {
    const stats = document.getElementById("portfolio-stats");
    const values = [
      { value: data.projects.length, label: "Projects" },
      { value: data.experience.length, label: "Experience entries" }
    ];
    values.filter((item) => item.value > 0).forEach((item) => {
      const stat = makeElement("div", "stat");
      stat.append(makeElement("span", "stat-value", String(item.value)), makeElement("span", "stat-label", item.label));
      stats.append(stat);
    });
  };

  const renderExperience = () => {
    const list = document.getElementById("experience-list");
    data.experience.forEach((item) => {
      const card = makeElement("article", "experience-card");
      const details = makeElement("div");
      details.append(makeElement("h3", "experience-role", item.role), makeElement("p", "experience-company", `${item.company} · ${item.location}`));
      card.append(details, makeElement("p", "experience-date", item.dates), makeElement("p", "experience-description", item.description));
      list.append(card);
    });
  };

  const addTagList = (parent, tags, className = "tag-list") => {
    const list = makeElement("ul", className);
    tags.forEach((tag) => list.append(makeElement("li", "", tag)));
    parent.append(list);
  };

  const projectGrid = document.getElementById("project-grid");
  const emptyResults = document.getElementById("project-empty");
  const dialog = document.getElementById("project-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-description");
  const dialogTags = document.getElementById("dialog-tags");
  const dialogLinks = document.getElementById("dialog-links");
  let dialogOpener = null;

  const addProjectLinks = (parent, project, className) => {
    const links = makeElement("div", className);
    [["github", "GitHub"], ["live", "Live demo"]].forEach(([key, label]) => {
      const url = safeExternalUrl(project[key]);
      if (!url) return;
      const link = makeElement("a", "project-link", label);
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      links.append(link);
    });
    parent.append(links);
  };

  const openProject = (project) => {
    dialogOpener = document.activeElement;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogTags.replaceChildren();
    project.technologies.forEach((tag) => dialogTags.append(makeElement("li", "", tag)));
    dialogLinks.replaceChildren();
    addProjectLinks(dialogLinks, project, "dialog-links");
    dialog.showModal();
    document.getElementById("dialog-close").focus();
  };

  const renderProjects = (query = "") => {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = data.projects.filter((project) => {
      const searchableText = `${project.title} ${project.summary} ${project.technologies.join(" ")}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
    projectGrid.replaceChildren();
    matches.forEach((project, index) => {
      const card = makeElement("article", "project-card");
      card.append(makeElement("span", "project-index", `0${index + 1}`));
      card.append(makeElement("h3", "", project.title), makeElement("p", "", project.summary));
      addTagList(card, project.technologies);
      const footer = makeElement("div", "project-card-footer");
      const details = makeElement("button", "text-button", "View details ↗");
      details.type = "button";
      details.addEventListener("click", () => openProject(project));
      footer.append(details);
      addProjectLinks(footer, project, "project-links");
      card.append(footer);
      projectGrid.append(card);
    });
    emptyResults.hidden = matches.length !== 0;
  };

  const renderSkills = () => {
    const grid = document.getElementById("skills-grid");
    data.skills.forEach((group) => {
      const card = makeElement("section", "skill-card");
      card.setAttribute("aria-label", `${group.category} skills`);
      card.append(makeElement("h3", "", group.category));
      const list = makeElement("div", "skill-list");
      group.items.forEach((skill) => {
        const item = makeElement("div", "skill-item");
        const labelRow = makeElement("div", "skill-label-row");
        const label = makeElement("span", "", skill.name);
        const percentage = makeElement("span", "skill-value", `${skill.level}%`);
        const track = makeElement("div", "skill-track");
        const progress = makeElement("div", "skill-progress");
        track.setAttribute("role", "progressbar");
        track.setAttribute("aria-label", `${skill.name} proficiency`);
        track.setAttribute("aria-valuemin", "0");
        track.setAttribute("aria-valuemax", "100");
        track.setAttribute("aria-valuenow", String(skill.level));
        progress.style.width = `${skill.level}%`;
        labelRow.append(label, percentage);
        track.append(progress);
        item.append(labelRow, track);
        list.append(item);
      });
      card.append(list);
      grid.append(card);
    });
  };

  const renderContact = () => {
    const contact = document.getElementById("contact-details");
    const emailRow = makeElement("div", "contact-detail");
    emailRow.append(makeElement("span", "contact-detail-label", "Email"));
    const email = makeElement("a", "", data.owner.email);
    email.href = `mailto:${encodeURIComponent(data.owner.email)}`;
    emailRow.append(email);
    const locationRow = makeElement("div", "contact-detail");
    locationRow.append(makeElement("span", "contact-detail-label", "Location"), makeElement("span", "", data.owner.location));
    contact.append(emailRow, locationRow);
    if (typeof data.owner.phone === "string" && data.owner.phone.trim()) {
      const phoneRow = makeElement("div", "contact-detail");
      phoneRow.append(makeElement("span", "contact-detail-label", "Phone"));
      const phone = makeElement("a", "", data.owner.phone);
      phone.href = `tel:${data.owner.phone.replace(/[^\d+]/g, "")}`;
      phoneRow.append(phone);
      contact.append(phoneRow);
    }
  };

  renderStats();
  renderExperience();
  renderProjects();
  renderSkills();
  renderContact();

  const search = document.getElementById("project-search");
  search.addEventListener("input", () => renderProjects(search.value));

  document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    const fallbackButton = document.querySelector(".project-card .text-button");
    const focusTarget = dialogOpener instanceof HTMLElement && dialogOpener.isConnected ? dialogOpener : fallbackButton;
    if (focusTarget) focusTarget.focus();
  });

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("primary-navigation");
  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      if (dialog.open) dialog.close();
    }
  });

  const navigationLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const sections = navigationLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const roleText = document.getElementById("role-text");
  let roleIndex = 0;
  if (!reducedMotion && data.owner.roles.length > 1) {
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % data.owner.roles.length;
      roleText.textContent = data.owner.roles[roleIndex];
    }, 2800);
  }

  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "";
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const name = String(formData.get("name")).trim();
    const sender = String(formData.get("email")).trim();
    const subject = String(formData.get("subject")).trim();
    const message = String(formData.get("message")).trim();
    const body = `From: ${name}\nEmail: ${sender}\n\n${message}`;
    const mailto = `mailto:${encodeURIComponent(data.owner.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    feedback.textContent = "Opening your email app with a draft. The message has not been sent by this site.";
    window.location.href = mailto;
  });

  const backToTop = document.getElementById("back-to-top");
  const updateBackToTop = () => { backToTop.hidden = window.scrollY < 500; };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    document.getElementById("home").focus({ preventScroll: true });
  });

  document.documentElement.classList.add("js-enabled");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".section-bordered .container, .stats").forEach((element) => revealObserver.observe(element));
  }
})();
