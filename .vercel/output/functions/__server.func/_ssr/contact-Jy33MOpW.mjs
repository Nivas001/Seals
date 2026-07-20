import { a as __toESM } from "../_runtime.mjs";
import { n as COMPANY, t as CATEGORIES } from "./catalog-DvL_hCl1.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as Paperclip, f as MapPin, g as Instagram, m as Linkedin, o as Send, p as Mail, s as Phone, u as MessageCircle, x as Clock } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as Footer } from "./Footer-D6773OTi.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Jy33MOpW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "overflow-x-clip pt-28 sm:pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-7xl px-4 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-brass" }), " Get in touch"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display font-black leading-[0.95] tracking-[-0.035em] text-ink text-balance",
								style: { fontSize: "clamp(2rem, 8vw, 4.75rem)" },
								children: [
									"Request a quote.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-brass",
										children: "We’ll match the part."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground",
								children: "Share a spec sheet, drawing, model number or a photograph of the worn component. Our sales team responds with the exact grade, brand recommendation and dispatch timeline."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid gap-5 lg:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorporateCard, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryCard, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowCard, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsletterCard, {})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-brass",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-display text-xl font-black tracking-tight text-ink",
								children: "Hosur, Tamil Nadu"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://maps.google.com/?q=Arasanatti+Hosur+Tamil+Nadu+635126",
								target: "_blank",
								rel: "noreferrer",
								className: "text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-ink",
								children: "Open in Maps →"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "AARRKKAA International — Hosur head office map",
							src: "https://maps.google.com/maps?q=Arasanatti%20Hosur%20Tamil%20Nadu%20635126&t=&z=13&ie=UTF8&iwloc=&output=embed",
							className: "h-80 w-full border-t border-hairline",
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function CardShell({ eyebrow, title, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative overflow-hidden rounded-[1.5rem] border border-hairline bg-surface p-5 shadow-soft sm:rounded-[1.75rem] sm:p-8 ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-brass",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl font-black leading-tight tracking-tight text-ink sm:text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children
			})
		]
	});
}
function InfoRow({ icon: Icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl text-brass-foreground",
			style: { background: "var(--gradient-brass)" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm font-medium text-ink",
				children
			})]
		})]
	});
}
function CorporateCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardShell, {
		eyebrow: "Corporate",
		title: COMPANY.name,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "-mt-3 text-sm text-muted-foreground",
			children: [COMPANY.tagline, " · Assist & Deliver"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 divide-y divide-hairline",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					icon: Phone,
					label: "Call",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col",
						children: COMPANY.phones.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${p.replace(/\s/g, "")}`,
							className: "hover:text-brass",
							children: p
						}, p))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					icon: Mail,
					label: "Email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col",
						children: COMPANY.emails.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${e}`,
							className: "break-all hover:text-brass",
							children: e
						}, e))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoRow, {
					icon: MapPin,
					label: "Head office",
					children: [
						COMPANY.address.line1,
						", ",
						COMPANY.address.line2,
						",",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						COMPANY.address.city,
						", ",
						COMPANY.address.district,
						",",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						COMPANY.address.state,
						" — ",
						COMPANY.address.pincode
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					icon: Clock,
					label: "Response time",
					children: "Within 24 hours on business days."
				})
			]
		})]
	});
}
var inputBase = "w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/70 shadow-inner outline-none transition focus:border-ink/40 focus:ring-2 focus:ring-brass/30";
var labelBase = "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";
function InquiryCard() {
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [fileName, setFileName] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const name = String(data.get("name") ?? "").trim();
		const email = String(data.get("email") ?? "").trim();
		const message = String(data.get("message") ?? "").trim();
		if (!name || name.length > 100) {
			toast.error("Please enter a valid name (up to 100 characters).");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
			toast.error("Please enter a valid email address.");
			return;
		}
		if (!message || message.length > 2e3) {
			toast.error("Message is required (up to 2000 characters).");
			return;
		}
		setSubmitting(true);
		const subject = String(data.get("subject") ?? "Product enquiry");
		const category = String(data.get("category") ?? "");
		const body = [
			`Name: ${name}`,
			`Email: ${email}`,
			category ? `Category: ${category}` : null,
			"",
			message
		].filter(Boolean).join("\n");
		const url = `mailto:${COMPANY.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = url;
		toast.success("Opening your email client…");
		setTimeout(() => setSubmitting(false), 800);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardShell, {
		eyebrow: "Enquiry",
		title: "Send us a request",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit,
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "name",
							className: labelBase,
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "name",
							name: "name",
							required: true,
							maxLength: 100,
							placeholder: "Full name",
							className: `mt-2 ${inputBase}`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "email",
							className: labelBase,
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							name: "email",
							type: "email",
							required: true,
							maxLength: 255,
							placeholder: "you@company.com",
							className: `mt-2 ${inputBase}`
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "category",
							className: labelBase,
							children: "Product category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "category",
							name: "category",
							defaultValue: "",
							className: `mt-2 ${inputBase} appearance-none`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								disabled: true,
								children: "Select a category"
							}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.name,
								children: c.name
							}, c.slug))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "subject",
							className: labelBase,
							children: "Subject"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "subject",
							name: "subject",
							maxLength: 140,
							placeholder: "Purpose of enquiry",
							className: `mt-2 ${inputBase}`
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "message",
					className: labelBase,
					children: "Message"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "message",
					name: "message",
					required: true,
					rows: 5,
					maxLength: 2e3,
					placeholder: "Share your duty conditions, drawing numbers or part specs…",
					className: `mt-2 ${inputBase} resize-y`
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: labelBase,
					children: "Attachment (optional)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink/20 bg-background px-3 py-3 text-sm text-muted-foreground hover:border-ink/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex shrink-0 items-center gap-2 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-3.5 w-3.5" }), " Browse"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate",
							children: fileName || "No file selected"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							className: "hidden",
							onChange: (e) => setFileName(e.target.files?.[0]?.name ?? "")
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: submitting,
					className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-background transition hover:bg-ink/85 disabled:opacity-60 sm:w-auto sm:self-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), submitting ? "Sending…" : "Submit inquiry"]
				})
			]
		})
	});
}
function FollowCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardShell, {
		eyebrow: "Connect",
		title: "Follow our journey",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "-mt-3 text-sm text-muted-foreground",
			children: "Stay updated with our latest product launches, industry insights and corporate news from the shop floor."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-wrap gap-3",
			children: [
				{
					href: "https://www.linkedin.com/",
					label: "LinkedIn",
					Icon: Linkedin
				},
				{
					href: "https://www.instagram.com/",
					label: "Instagram",
					Icon: Instagram
				},
				{
					href: "https://wa.me/917806936475",
					label: "WhatsApp",
					Icon: MessageCircle
				}
			].map(({ href, label, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href,
				target: "_blank",
				rel: "noreferrer",
				"aria-label": label,
				className: "group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-hairline bg-background px-5 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-lg hover:shadow-brass/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brass/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative grid h-9 w-9 place-items-center rounded-lg text-brass-foreground shadow-sm transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-6deg]",
						style: { background: "var(--gradient-brass)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 transition-transform duration-300 group-hover:scale-110" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative transition-colors duration-300 group-hover:text-brass",
						children: label
					})
				]
			}, label))
		})]
	});
}
function NewsletterCard() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	function onSubscribe(e) {
		e.preventDefault();
		const trimmed = email.trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
			toast.error("Please enter a valid email address.");
			return;
		}
		setBusy(true);
		setTimeout(() => {
			toast.success("Subscribed — thanks for following AARRKKAA.");
			setEmail("");
			setBusy(false);
		}, 500);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-[1.5rem] border border-hairline bg-surface p-5 text-ink shadow-soft sm:rounded-[1.75rem] sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-brass",
				children: "Newsletter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl font-black leading-tight tracking-tight text-ink sm:text-3xl",
				children: "Stay updated"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted-foreground",
				children: "Get technical articles, catalog updates and enterprise offers delivered directly to your inbox."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: onSubscribe,
				className: "mt-6 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					required: true,
					maxLength: 255,
					value: email,
					onChange: (e) => setEmail(e.target.value),
					placeholder: "Enter your email…",
					className: "min-w-0 w-full rounded-full border border-ink/15 bg-background px-5 py-3 text-sm text-ink placeholder:text-muted-foreground outline-none transition focus:border-brass/70 focus:ring-2 focus:ring-brass/30"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy,
					className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-background transition hover:bg-ink/85 disabled:opacity-60",
					children: busy ? "…" : "Subscribe"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] text-muted-foreground",
				children: "No spam. Unsubscribe at any time."
			})
		]
	});
}
//#endregion
export { ContactPage as component };
