import "./oneui-react.css";
import { a as e, c as t, d as n, f as r, l as i, m as a, n as o, o as s, p as c, r as l, s as u, t as d, u as f } from "./icons-DQRCVyKi.js";
import { createContext as p, forwardRef as m, useCallback as h, useContext as g, useEffect as _, useId as v, useLayoutEffect as y, useMemo as b, useRef as x, useState as S, useSyncExternalStore as C } from "react";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
import { createPortal as D } from "react-dom";
import { createRoot as O } from "react-dom/client";
//#region src/strings.ts
var k = {
	relatedDescription: "Looking for something else?",
	newBadge: "N",
	navigationDrawer: "Navigation drawer",
	actionModeAll: "All",
	actionModeSelected: (e) => `${e} selected`,
	actionModeSelectItems: "Select items",
	appInfo: "App info",
	versionInfo: (e) => `Version ${e}`,
	update: "Update",
	retry: "Retry",
	newVersionIsAvailable: "A new version is available.",
	latestVersion: "The latest version is already installed.",
	timeStart: "Start",
	timeEnd: "End",
	add: "Add",
	apply: "Apply",
	yes: "Yes",
	cancel: "Cancel",
	continue: "Continue",
	disable: "Disable",
	done: "Done",
	edit: "Edit",
	close: "Close",
	tipHint: "Double tap this button to learn more."
};
function A(e) {
	return e ? {
		...k,
		...e
	} : k;
}
//#endregion
//#region src/theme.tsx
var j = p(null);
function M(e) {
	return e === "system" ? typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : e;
}
function N({ theme: e = "system", onThemeChange: t, strings: n, accent: r, radius: i, scope: a = "document", className: o, style: s, children: c }) {
	let l = e, u = (e) => t?.(e);
	_(() => {
		if (l !== "system" || typeof window > "u" || !window.matchMedia) return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), n = () => t?.("system");
		return e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, [l, t]);
	let d = M(l);
	_(() => {
		if (a !== "document" || typeof document > "u") return;
		let e = document.documentElement;
		return e.setAttribute("data-oneui-theme", d), () => {
			e.getAttribute("data-oneui-theme") === d && e.removeAttribute("data-oneui-theme");
		};
	}, [d, a]);
	let f = b(() => {
		if (!r) return i === void 0 ? void 0 : {};
		let e = typeof r == "string" ? r : r.primary;
		return {
			"--oui-primary": e,
			"--oui-primary-dark": typeof r == "string" ? `color-mix(in srgb, ${e}, #000 20%)` : r.dark ?? e
		};
	}, [r]), p = i === void 0 ? s : {
		"--oui-radius-page": `${i}px`,
		...s
	}, m = f ? {
		...f,
		...p
	} : p, h = b(() => ({
		theme: d,
		preference: l,
		setTheme: u,
		strings: A(n)
	}), [
		d,
		l,
		n
	]);
	return /* @__PURE__ */ T(j.Provider, {
		value: h,
		children: /* @__PURE__ */ T("div", {
			className: o,
			"data-oneui-theme": a === "element" ? d : void 0,
			"data-oneui-root": "",
			style: m,
			children: c
		})
	});
}
function P() {
	return g(j) || {
		theme: M("system"),
		preference: "system",
		setTheme: () => {},
		strings: A(void 0)
	};
}
function F() {
	let { theme: e, preference: t, setTheme: n } = P();
	return {
		theme: e,
		preference: t,
		setTheme: n
	};
}
function I() {
	return P().strings;
}
//#endregion
//#region src/utils.ts
function L(...e) {
	return e.filter(Boolean).join(" ");
}
function R(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function z(e, t, n) {
	let r = e !== void 0, [i, a] = S(t), o = r ? e : i, s = x(n);
	return s.current = n, [o, h((e) => {
		r || a(e), s.current?.(e);
	}, [r])];
}
function B(e, t) {
	let n = x(t);
	n.current = t, _(() => {
		if (!e || typeof window > "u") return;
		let t = (e) => {
			e.key === "Escape" && n.current();
		};
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [e]);
}
function V(e) {
	if (!e) return null;
	if (typeof e == "function") return e();
	if (typeof HTMLElement < "u" && e instanceof HTMLElement) return e.getBoundingClientRect();
	if (typeof DOMRect < "u" && e instanceof DOMRect) return e;
	let t = e.current;
	return t ? t.getBoundingClientRect() : null;
}
var H = typeof window < "u" && typeof document < "u", U = 0, W = 1, G = 2, K = 4, ee = 8, te = 15, ne = 3, re = 12;
function ie(e) {
	if (typeof e == "number") return e;
	switch (e) {
		case "all": return 15;
		case "none": return 0;
		case "top": return 3;
		case "bottom": return 12;
		case "topLeft": return 1;
		case "topRight": return 2;
		case "bottomLeft": return 4;
		case "bottomRight": return 8;
	}
}
function ae({ roundedCorners: e = 15, radius: t, color: n, as: r = "div", className: i, style: a, children: o, ...s }) {
	let c = ie(e), l = t == null ? "var(--oui-radius-xl)" : `${t}px`, u = c & 1 ? l : "0", d = c & 2 ? l : "0", f = c & 4 ? l : "0", p = c & 8 ? l : "0";
	return /* @__PURE__ */ T(r, {
		className: L("oui-round", i),
		style: {
			borderRadius: `${u} ${d} ${p} ${f}`,
			...n == null ? null : { background: n },
			...a
		},
		...s,
		children: o
	});
}
//#endregion
//#region src/components/Button.tsx
function oe({ variant: e = "colored", fullWidth: t = !1, className: n, children: r, type: i = "button", ...a }) {
	return /* @__PURE__ */ T("button", {
		type: i,
		className: L("oui-btn", `oui-btn--${e}`, t && "oui-btn--full", "oui-press", n),
		...a,
		children: /* @__PURE__ */ T("span", {
			className: "oui-btn__label",
			children: r
		})
	});
}
//#endregion
//#region src/components/Switch.tsx
var q = m(function({ checked: e, defaultChecked: t = !1, onChange: n, label: r, className: i, disabled: a, type: o = "button", ...s }, c) {
	let [l, u] = z(e, t, n);
	return /* @__PURE__ */ T("button", {
		ref: c,
		type: o,
		role: "switch",
		"aria-checked": l,
		"aria-label": r,
		disabled: a,
		className: L("oui-switch", i),
		onClick: () => u(!l),
		...s,
		children: /* @__PURE__ */ T("span", {
			className: "oui-switch__track",
			"aria-hidden": "true",
			children: /* @__PURE__ */ T("span", { className: "oui-switch__thumb" })
		})
	});
});
//#endregion
//#region src/components/SwitchBar.tsx
function se({ checked: e, defaultChecked: t, onChange: n, label: r, loading: i = !1, wrapContent: a = !0, className: o, contentClassName: s, children: c }) {
	let l = /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ E("div", {
		className: L("oui-switchbar", o),
		"data-on": e,
		children: [
			/* @__PURE__ */ T("span", {
				className: "oui-switchbar__label",
				children: r
			}),
			i ? /* @__PURE__ */ T("span", {
				className: "oui-switchbar__spinner",
				"aria-hidden": "true"
			}) : null,
			/* @__PURE__ */ T(q, {
				checked: e,
				defaultChecked: t,
				onChange: n,
				label: r
			})
		]
	}), a ? /* @__PURE__ */ T(ae, {
		roundedCorners: 3,
		className: L("oui-switchbar__content", s),
		children: c
	}) : c] });
	return /* @__PURE__ */ T("div", {
		className: "oui-switchbar-layout",
		children: l
	});
}
function ce({ label: e, onClick: t, className: n }) {
	return /* @__PURE__ */ T("button", {
		type: "button",
		className: L("oui-switchbar__action", "oui-press", n),
		onClick: t,
		children: e
	});
}
//#endregion
//#region src/components/Separator.tsx
function le({ children: e, className: t, ...n }) {
	let r = e != null && e !== "";
	return /* @__PURE__ */ T("div", {
		role: r ? void 0 : "separator",
		className: L("oui-separator", r ? "oui-separator--label" : "oui-separator--line", t),
		...n,
		children: r ? /* @__PURE__ */ T("span", {
			className: "oui-separator__text",
			children: e
		}) : null
	});
}
//#endregion
//#region src/components/Toast.tsx
var ue = 0, J = [], de = /* @__PURE__ */ new Set(), fe = null, Y = null;
function pe() {
	for (let e of de) e();
}
function me(e) {
	return de.add(e), () => de.delete(e);
}
function he() {
	return J;
}
function ge() {
	H && (!Y || !document.body.contains(Y)) && (Y = document.createElement("div"), Y.className = "oui-toast-host", document.body.appendChild(Y), fe = O(Y), fe.render(/* @__PURE__ */ T(be, {})));
}
function _e(e, t = {}) {
	if (!H) return -1;
	let n = ++ue, r = t.position ?? "bottom";
	ge(), J = [...J, {
		id: n,
		message: e,
		position: r
	}], pe();
	let i = t.duration ?? 2200;
	return i > 0 && window.setTimeout(() => ve(n), i), n;
}
function ve(e) {
	J = J.filter((t) => t.id !== e), pe();
}
function ye() {
	J = [], pe();
}
function be() {
	let e = C(me, he, he);
	return /* @__PURE__ */ T(w, { children: [
		"bottom",
		"top",
		"center"
	].map((t) => {
		let n = e.filter((e) => e.position === t);
		return n.length === 0 ? null : /* @__PURE__ */ T("div", {
			className: L("oui-toast-viewport", `oui-toast-viewport--${t}`),
			"aria-live": "polite",
			children: n.map((e) => /* @__PURE__ */ T("div", {
				className: "oui-toast",
				role: "status",
				children: /* @__PURE__ */ T("span", {
					className: "oui-toast__text",
					children: e.message
				})
			}, e.id))
		}, t);
	}) });
}
function xe({ open: e, onClose: t, duration: n = 2200, position: r = "bottom", children: i }) {
	let [a, o] = S(e);
	return _(() => o(e), [e]), _(() => {
		if (!e || n <= 0) return;
		let r = window.setTimeout(() => {
			o(!1), t?.();
		}, n);
		return () => window.clearTimeout(r);
	}, [
		e,
		n,
		t
	]), !a || !H ? null : D(/* @__PURE__ */ T("div", {
		className: L("oui-toast-viewport", `oui-toast-viewport--${r}`),
		"aria-live": "polite",
		children: /* @__PURE__ */ T("div", {
			className: "oui-toast",
			role: "status",
			children: /* @__PURE__ */ T("span", {
				className: "oui-toast__text",
				children: i
			})
		})
	}), document.body);
}
//#endregion
//#region src/components/Page.tsx
function Se({ title: e, expandedTitle: t, subtitle: n, expandedSubtitle: r, onNavClick: a, navIcon: o, navLabel: u, navBadge: d, navAsBack: f = !1, actions: p, expandable: m = !0, expanded: g = !0, onExpandedChange: v, searchMode: y = !1, searchQuery: b = "", searchPlaceholder: C = "Search", onSearchQueryChange: D, onSearchClose: O, searchTrailing: k, actionMode: A = null, headerBackground: j, footer: M, className: N, style: P, children: F }) {
	let z = I(), B = x(null), V = x(null), H = x(null), [U, W] = S(+!g), G = h(() => {
		let e = V.current;
		return Math.max(e?.offsetHeight ?? 0, 1);
	}, []), K = h(() => {
		if (!m) return;
		let e = B.current;
		if (!e) return;
		let t = R(e.scrollTop / G(), 0, 1);
		W(t), v?.(t < .5);
	}, [
		m,
		G,
		v
	]);
	_(() => {
		let e = B.current;
		if (!e) return;
		let t = g || !m ? 0 : G();
		Math.abs(e.scrollTop - t) > 1 && (e.scrollTop = t, W(g || !m ? 0 : 1));
	}, []);
	let ee = x(g);
	_(() => {
		if (ee.current === g) return;
		ee.current = g;
		let e = B.current;
		if (!e || !m) return;
		let t = g ? 0 : G();
		e.scrollTo({
			top: t,
			behavior: "smooth"
		});
	}, [g, m]), _(() => {
		y && H.current?.focus();
	}, [y]);
	let te = R((U - .55) / .35, 0, 1), ne = U > .6 || !m || y || !!A, re = t ?? e, ie = r ?? n, ae = m && !y && !A, oe = a || o ? /* @__PURE__ */ E("button", {
		type: "button",
		className: "oui-page__nav oui-press",
		"aria-label": u ?? z.navigationDrawer,
		onClick: a,
		children: [o ?? T(f ? l : i, {}), d != null && d !== 0 && d !== "" ? /* @__PURE__ */ T("span", {
			className: "oui-page__nav-badge",
			children: typeof d == "number" && d > 99 ? "99+" : d
		}) : null]
	}) : /* @__PURE__ */ T("span", {
		className: "oui-page__nav-spacer",
		"aria-hidden": "true"
	}), q;
	return q = A ? /* @__PURE__ */ E("div", {
		className: "oui-page__action-mode",
		role: "toolbar",
		children: [
			/* @__PURE__ */ T("button", {
				type: "button",
				className: "oui-page__nav oui-press",
				"aria-label": z.close,
				onClick: A.onClose,
				children: /* @__PURE__ */ T(s, {})
			}),
			/* @__PURE__ */ T("span", {
				className: "oui-page__action-count",
				children: A.count > 0 ? z.actionModeSelected(A.count) : z.actionModeSelectItems
			}),
			/* @__PURE__ */ T("span", { className: "oui-page__toolbar-spacer" }),
			A.showAll !== !1 && A.onToggleAll ? /* @__PURE__ */ E("label", {
				className: "oui-page__action-all",
				children: [/* @__PURE__ */ T("input", {
					type: "checkbox",
					checked: !!A.allChecked,
					onChange: (e) => A.onToggleAll?.(e.target.checked)
				}), z.actionModeAll]
			}) : null,
			A.actions
		]
	}) : y ? /* @__PURE__ */ E("div", {
		className: "oui-page__search",
		role: "search",
		children: [
			/* @__PURE__ */ T("button", {
				type: "button",
				className: "oui-page__nav oui-press",
				"aria-label": z.close,
				onClick: O,
				children: /* @__PURE__ */ T(l, {})
			}),
			/* @__PURE__ */ T("input", {
				ref: H,
				className: "oui-page__search-input",
				type: "search",
				value: b,
				placeholder: C,
				"aria-label": C,
				onChange: (e) => D?.(e.target.value)
			}),
			k ?? /* @__PURE__ */ T("span", {
				className: "oui-page__search-icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ T(c, { size: 20 })
			})
		]
	}) : /* @__PURE__ */ E(w, { children: [
		oe,
		/* @__PURE__ */ T("span", {
			className: "oui-page__collapsed-title",
			style: { opacity: m ? te : 1 },
			"aria-hidden": m ? te < .5 : !1,
			children: e
		}),
		/* @__PURE__ */ T("span", { className: "oui-page__toolbar-spacer" }),
		p ? /* @__PURE__ */ T("div", {
			className: "oui-page__actions",
			children: p
		}) : null
	] }), /* @__PURE__ */ E("div", {
		className: L("oui-page", N),
		"data-collapsed": ne || void 0,
		style: j ? { "--oui-header-bg": j } : void 0,
		children: [/* @__PURE__ */ E("div", {
			ref: B,
			className: "oui-page__scroll",
			onScroll: K,
			children: [
				/* @__PURE__ */ T("div", {
					className: "oui-page__toolbar",
					role: "toolbar",
					"aria-label": e,
					children: q
				}),
				ae ? /* @__PURE__ */ E("div", {
					ref: V,
					className: "oui-page__title-block",
					children: [/* @__PURE__ */ T("h1", {
						className: "oui-page__expanded-title",
						children: re
					}), ie ? /* @__PURE__ */ T("p", {
						className: "oui-page__expanded-subtitle",
						children: ie
					}) : null]
				}) : null,
				/* @__PURE__ */ T("main", {
					className: "oui-page__surface",
					style: P,
					children: F
				})
			]
		}), M ? /* @__PURE__ */ T("div", {
			className: "oui-page__footer",
			children: M
		}) : null]
	});
}
//#endregion
//#region src/components/BottomNav.tsx
function Ce({ items: e, value: t, onChange: n, variant: r = "fixed", className: i, "aria-label": a }) {
	return /* @__PURE__ */ T("nav", {
		className: L("oui-bottom-nav", `oui-bottom-nav--${r}`, i),
		"aria-label": a,
		children: e.map((e) => {
			let r = e.key === t;
			return /* @__PURE__ */ E("button", {
				type: "button",
				className: L("oui-bottom-nav__item", r && "is-active"),
				"aria-current": r ? "page" : void 0,
				disabled: e.disabled,
				onClick: () => n?.(e.key),
				children: [/* @__PURE__ */ E("span", {
					className: "oui-bottom-nav__icon",
					"aria-hidden": "true",
					children: [e.icon, e.badge != null && e.badge !== 0 && e.badge !== "" ? /* @__PURE__ */ T("span", {
						className: "oui-bottom-nav__badge",
						children: typeof e.badge == "number" && e.badge > 9 ? "9+" : e.badge
					}) : null]
				}), /* @__PURE__ */ T("span", {
					className: "oui-bottom-nav__label",
					children: e.label
				})]
			}, e.key);
		})
	});
}
//#endregion
//#region src/components/Drawer.tsx
function we({ open: e, onClose: t, children: n, header: r, width: i = 320, dimColor: a, disableScrim: o = !1, className: s, "aria-label": c }) {
	let l = I(), u = x(null), d = x(e);
	return B(e, () => t?.()), _(() => {
		e && !d.current && u.current?.focus(), d.current = e;
	}, [e]), H ? D(/* @__PURE__ */ E("div", {
		className: L("oui-drawer-root", e && "is-open"),
		"aria-hidden": !e,
		children: [/* @__PURE__ */ T("div", {
			className: "oui-drawer__scrim",
			style: a ? { background: a } : void 0,
			onClick: o ? void 0 : t,
			"aria-hidden": "true"
		}), /* @__PURE__ */ E("div", {
			ref: u,
			className: L("oui-drawer", s),
			style: { width: `min(${i}px, 86vw)` },
			role: "dialog",
			"aria-modal": "true",
			"aria-label": c ?? l.navigationDrawer,
			tabIndex: -1,
			children: [r ? /* @__PURE__ */ T("div", {
				className: "oui-drawer__header",
				children: r
			}) : null, /* @__PURE__ */ T("div", {
				className: "oui-drawer__content",
				children: n
			})]
		})]
	}), document.body) : null;
}
//#endregion
//#region src/components/Splash.tsx
function Te({ image: e, title: t, animated: n = !1, loop: r = !1, className: i, style: a }) {
	return /* @__PURE__ */ E("div", {
		className: L("oui-splash", i),
		style: a,
		role: "presentation",
		children: [e ? /* @__PURE__ */ T("div", {
			className: L("oui-splash__image", n && "oui-splash__image--animated", n && r && "is-looping"),
			children: e
		}) : null, t ? /* @__PURE__ */ T("p", {
			className: "oui-splash__title",
			children: t
		}) : null]
	});
}
//#endregion
//#region src/components/ProgressBar.tsx
function X({ size: e = 40, strokeWidth: t = 3.5, value: n, message: r, className: i, "aria-label": a }) {
	let o = (e - t) / 2, s = 2 * Math.PI * o, c = typeof n == "number", l = c ? Math.min(100, Math.max(0, n)) : 0;
	return /* @__PURE__ */ E("div", {
		className: L("oui-progress-circle", !c && "is-indeterminate", i),
		style: {
			width: e,
			height: e
		},
		role: "progressbar",
		"aria-valuemin": c ? 0 : void 0,
		"aria-valuemax": c ? 100 : void 0,
		"aria-valuenow": c ? Math.round(l) : void 0,
		"aria-label": a ?? (c ? "Progress" : "Loading"),
		children: [/* @__PURE__ */ E("svg", {
			width: e,
			height: e,
			viewBox: `0 0 ${e} ${e}`,
			"aria-hidden": "true",
			children: [/* @__PURE__ */ T("circle", {
				className: "oui-progress-circle__track",
				cx: e / 2,
				cy: e / 2,
				r: o,
				fill: "none",
				strokeWidth: t
			}), /* @__PURE__ */ T("circle", {
				className: "oui-progress-circle__bar",
				cx: e / 2,
				cy: e / 2,
				r: o,
				fill: "none",
				strokeWidth: t,
				strokeLinecap: "round",
				strokeDasharray: c ? `${l / 100 * s} ${s}` : void 0,
				strokeDashoffset: c ? s * .25 : void 0,
				transform: `rotate(-90 ${e / 2} ${e / 2})`
			})]
		}), r ? /* @__PURE__ */ T("span", {
			className: "oui-progress-circle__message",
			children: r
		}) : null]
	});
}
function Ee({ value: e, numberText: t, showPercent: n = !1, className: r, "aria-label": i }) {
	let a = typeof e == "number", o = a ? Math.min(100, Math.max(0, e)) : 0, s = Math.round(o);
	return /* @__PURE__ */ E("div", {
		className: L("oui-progress-linear-wrap", r),
		children: [/* @__PURE__ */ T("div", {
			className: L("oui-progress-linear", !a && "is-indeterminate"),
			role: "progressbar",
			"aria-valuemin": a ? 0 : void 0,
			"aria-valuemax": a ? 100 : void 0,
			"aria-valuenow": a ? s : void 0,
			"aria-label": i ?? "Loading",
			children: /* @__PURE__ */ T("div", {
				className: "oui-progress-linear__bar",
				style: { width: `${o}%` }
			})
		}), t || n ? /* @__PURE__ */ E("div", {
			className: "oui-progress-linear__footer",
			children: [/* @__PURE__ */ T("span", {
				className: "oui-progress-linear__number",
				children: t
			}), /* @__PURE__ */ T("span", {
				className: "oui-progress-linear__percent",
				children: n ? `${s}%` : ""
			})]
		}) : null]
	});
}
function De({ variant: e = "circular", ...t }) {
	return e === "circular" ? /* @__PURE__ */ T(X, { ...t }) : /* @__PURE__ */ T(Ee, { value: t.value });
}
//#endregion
//#region src/components/AppInfo.tsx
function Oe({ name: e, version: t, versionText: n, icon: r, notice: i, loading: a = !1, actions: o, children: s, className: c, style: l }) {
	let u = I(), d = n ?? (t ? u.versionInfo(t) : null);
	return /* @__PURE__ */ T("div", {
		className: L("oui-app-info", c),
		style: l,
		children: /* @__PURE__ */ E("div", {
			className: "oui-app-info__upper",
			children: [
				r ? /* @__PURE__ */ T("div", {
					className: "oui-app-info__icon",
					children: r
				}) : null,
				/* @__PURE__ */ T("h1", {
					className: "oui-app-info__name",
					children: e
				}),
				d ? /* @__PURE__ */ T("p", {
					className: "oui-app-info__version",
					children: d
				}) : null,
				a ? /* @__PURE__ */ T("div", {
					className: "oui-app-info__progress",
					children: /* @__PURE__ */ T(X, { size: 40 })
				}) : null,
				i ? /* @__PURE__ */ T("p", {
					className: "oui-app-info__notice",
					children: i
				}) : null,
				o && o.length > 0 ? /* @__PURE__ */ T("div", {
					className: "oui-app-info__actions",
					children: o.map((e, t) => /* @__PURE__ */ T(oe, {
						variant: e.variant === "primary" ? "colored" : "outline",
						className: L("oui-app-info__button", e.variant !== "primary" && "oui-app-info__button--default"),
						onClick: e.onClick,
						disabled: e.disabled,
						children: e.label
					}, t))
				}) : null,
				s ? /* @__PURE__ */ T("div", {
					className: "oui-app-info__children",
					children: s
				}) : null
			]
		})
	});
}
//#endregion
//#region src/components/Tabs.tsx
function ke({ items: e, value: t, onChange: n, variant: r = "underline", inset: i = 24, className: a, "aria-label": o }) {
	let s = x(null);
	return /* @__PURE__ */ T("div", {
		ref: s,
		role: "tablist",
		"aria-label": o,
		className: L("oui-tabs", `oui-tabs--${r}`, a),
		style: { paddingInline: i },
		onKeyDown: (r) => {
			if (r.key !== "ArrowLeft" && r.key !== "ArrowRight") return;
			let i = e.filter((e) => !e.disabled), a = i.findIndex((e) => e.key === t);
			if (a < 0) return;
			r.preventDefault();
			let o = r.key === "ArrowRight" ? i[(a + 1) % i.length] : i[(a - 1 + i.length) % i.length];
			n?.(o.key);
			let c = s.current?.querySelector(`[data-key="${CSS.escape(o.key)}"]`);
			c?.focus(), c?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		},
		children: e.map((e) => {
			let i = e.key === t;
			return /* @__PURE__ */ E("button", {
				"data-key": e.key,
				type: "button",
				role: "tab",
				"aria-selected": i,
				disabled: e.disabled,
				className: L("oui-tabs__tab", i && "is-active"),
				onClick: () => n?.(e.key),
				children: [
					e.icon ? /* @__PURE__ */ T("span", {
						className: "oui-tabs__icon",
						children: e.icon
					}) : null,
					/* @__PURE__ */ T("span", {
						className: "oui-tabs__label",
						children: e.label
					}),
					e.badge != null && e.badge !== "" ? /* @__PURE__ */ T("span", {
						className: "oui-tabs__badge",
						children: e.badge
					}) : null,
					r === "underline" ? /* @__PURE__ */ T("span", {
						className: "oui-tabs__indicator",
						"aria-hidden": "true"
					}) : null
				]
			}, e.key);
		})
	});
}
//#endregion
//#region src/components/Slider.tsx
function Z(e, t, n) {
	return n <= t ? 0 : (e - t) / (n - t) * 100;
}
function Ae(e, t, n, r) {
	return R(r <= 0 ? e : t + Math.round((e - t) / r) * r, t, n);
}
function je({ value: e, onChange: t, onCommit: n, min: i = 0, max: a = 100, step: o = 1, disabled: s = !1, ticks: c = !1, stepper: l = !1, showValue: u = !1, units: f = "", formatValue: p, label: m, className: g, style: _ }) {
	let v = x(null), [y, b] = S(null), C = Array.isArray(e), w = C ? e[0] : e, D = C ? e[1] : e, O = h((e) => p ? p(e) : `${Math.round(e * 100) / 100}${f}`, [p, f]), k = h((e) => {
		let t = v.current;
		if (!t) return i;
		let n = t.getBoundingClientRect();
		return Ae(i + (n.width > 0 ? (e - n.left) / n.width : 0) * (a - i), i, a, o);
	}, [
		i,
		a,
		o
	]), A = h((e, n) => {
		if (!C) {
			t?.(e);
			return;
		}
		let [r, i] = [w, D];
		n === 0 ? r = Math.min(e, i) : i = Math.max(e, r), t?.([r, i]);
	}, [
		C,
		w,
		D,
		t
	]), j = (e) => {
		if (s || !v.current) return;
		e.preventDefault(), v.current.focus?.();
		let t = k(e.clientX), n = C && Math.abs(t - D) < Math.abs(t - w) ? 1 : 0;
		b(n), A(t, n), e.currentTarget.setPointerCapture?.(e.pointerId);
	}, M = (e) => {
		s || y === null || A(k(e.clientX), y);
	}, N = (t) => {
		y !== null && (b(null), t.currentTarget.releasePointerCapture?.(t.pointerId), n?.(e));
	}, P = (t) => {
		if (s) return;
		let r = o * 10, c = null, l = +!!C, u = C ? D : e;
		switch (t.key) {
			case "ArrowRight":
			case "ArrowUp":
				c = R(u + o, i, a);
				break;
			case "ArrowLeft":
			case "ArrowDown":
				c = R(u - o, i, a);
				break;
			case "PageUp":
				c = R(u + r, i, a);
				break;
			case "PageDown":
				c = R(u - r, i, a);
				break;
			case "Home":
				c = i, C && (l = 1);
				break;
			case "End":
				c = a;
				break;
			default: return;
		}
		t.preventDefault(), A(c, l), n?.(e);
	}, F = c && o > 0 ? Math.round((a - i) / o) : 0, I = F > 0 && F <= 40, z = Z(w, i, a), B = Z(D, i, a), V = C ? z : 0, H = C ? B : Z(e, i, a), U = (e) => {
		let t = Z(e === 0 ? w : D, i, a);
		return /* @__PURE__ */ T("span", {
			className: L("oui-slider__thumb", y === e && "is-dragging"),
			style: { left: `${t}%` },
			"aria-hidden": "true"
		}, e);
	}, W = C ? D : e, G = /* @__PURE__ */ E("div", {
		ref: v,
		className: L("oui-slider", s && "is-disabled", C && "is-range"),
		style: {
			"--oui-slider-fill-start": `${V}%`,
			"--oui-slider-fill-end": `${H}%`
		},
		role: "slider",
		tabIndex: s ? -1 : 0,
		"aria-label": m,
		"aria-valuemin": i,
		"aria-valuemax": a,
		"aria-valuenow": W,
		"aria-valuetext": O(W),
		"aria-disabled": s || void 0,
		"aria-orientation": "horizontal",
		onPointerDown: j,
		onPointerMove: M,
		onPointerUp: N,
		onPointerCancel: N,
		onKeyDown: P,
		children: [
			/* @__PURE__ */ E("div", {
				className: "oui-slider__rail",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ T("div", { className: "oui-slider__fill" }), I ? /* @__PURE__ */ T("div", {
					className: "oui-slider__ticks",
					children: Array.from({ length: F + 1 }, (e, t) => /* @__PURE__ */ T("span", {
						className: "oui-slider__tick",
						style: { left: `${t / F * 100}%` }
					}, t))
				}) : null]
			}),
			U(0),
			C ? U(1) : null,
			/* @__PURE__ */ T("input", {
				className: "oui-slider__hidden-input",
				type: "hidden",
				name: m,
				value: W,
				readOnly: !0
			})
		]
	}), K = u ? /* @__PURE__ */ T("div", {
		className: "oui-slider__value",
		children: O(W)
	}) : null;
	return l ? /* @__PURE__ */ E("div", {
		className: L("oui-slider-wrap", "oui-slider-wrap--stepper", g),
		style: _,
		children: [
			/* @__PURE__ */ T("button", {
				type: "button",
				className: "oui-slider__stepper oui-slider__stepper--minus oui-press",
				"aria-label": "Decrease",
				disabled: s || W <= i,
				onClick: () => {
					A(R(W - o, i, a), +!!C), n?.(e);
				},
				children: /* @__PURE__ */ T(r, {})
			}),
			/* @__PURE__ */ T("div", {
				className: "oui-slider-wrap__track",
				children: G
			}),
			/* @__PURE__ */ T("button", {
				type: "button",
				className: "oui-slider__stepper oui-slider__stepper--plus oui-press",
				"aria-label": "Increase",
				disabled: s || W >= a,
				onClick: () => {
					A(R(W + o, i, a), +!!C), n?.(e);
				},
				children: /* @__PURE__ */ T(d, {})
			}),
			K ? /* @__PURE__ */ T("div", {
				className: "oui-slider-wrap__readout",
				children: K
			}) : null
		]
	}) : /* @__PURE__ */ E("div", {
		className: L("oui-slider-wrap", g),
		style: _,
		children: [G, K]
	});
}
//#endregion
//#region src/components/Dialog.tsx
function Q({ open: e, onClose: t, title: n, children: r, actions: i, disableDismiss: a = !1, maxWidth: o = 360, className: s, "aria-label": c }) {
	let l = v();
	return B(e && !a, () => t?.()), !e || !H ? null : D(/* @__PURE__ */ E("div", {
		className: "oui-dialog-root",
		children: [/* @__PURE__ */ T("div", {
			className: "oui-dialog__scrim",
			onClick: a ? void 0 : t,
			"aria-hidden": "true"
		}), /* @__PURE__ */ E("div", {
			className: L("oui-dialog", s),
			role: "alertdialog",
			"aria-modal": "true",
			"aria-label": c ?? (n ? void 0 : "Dialog"),
			"aria-labelledby": n ? l : void 0,
			style: { maxWidth: o },
			children: [
				n ? /* @__PURE__ */ T("h2", {
					className: "oui-dialog__title",
					id: l,
					children: n
				}) : null,
				r == null ? null : /* @__PURE__ */ T("div", {
					className: "oui-dialog__body",
					children: r
				}),
				i ? /* @__PURE__ */ T("div", {
					className: "oui-dialog__actions",
					children: i
				}) : null
			]
		})]
	}), document.body);
}
function Me({ children: e, onClick: t, disabled: n, emphasis: r, className: i, autoFocus: a }) {
	return /* @__PURE__ */ T("button", {
		type: "button",
		className: L("oui-dialog__button", r && "is-emphasis", i),
		onClick: t,
		disabled: n,
		autoFocus: a,
		children: e
	});
}
//#endregion
//#region src/components/ProgressDialog.tsx
function Ne({ open: e, onClose: t, variant: n = "circle", message: r, value: i, numberText: a, percentText: o, disableDismiss: s = !0, className: c, maxWidth: l, "aria-label": u }) {
	let d = null;
	return d = n === "circle" ? /* @__PURE__ */ T("div", {
		className: "oui-progress-dialog__circle",
		children: /* @__PURE__ */ T(X, {
			size: 56,
			strokeWidth: 4,
			value: i,
			message: o ?? (typeof i == "number" ? `${Math.round(i)}%` : void 0),
			"aria-label": typeof r == "string" ? r : "Loading"
		})
	}) : n === "spinner" ? /* @__PURE__ */ E("div", {
		className: "oui-progress-dialog__spinner",
		children: [/* @__PURE__ */ T(X, {
			size: 40,
			"aria-label": "Loading"
		}), r == null ? null : /* @__PURE__ */ T("div", {
			className: "oui-progress-dialog__message",
			children: r
		})]
	}) : /* @__PURE__ */ E("div", {
		className: "oui-progress-dialog__horizontal",
		children: [
			r == null ? null : /* @__PURE__ */ T("div", {
				className: "oui-progress-dialog__message",
				children: r
			}),
			/* @__PURE__ */ T("div", {
				className: "oui-progress-dialog__bar-space",
				children: /* @__PURE__ */ T(Ee, { value: i })
			}),
			/* @__PURE__ */ E("div", {
				className: "oui-progress-dialog__footer",
				children: [/* @__PURE__ */ T("span", { children: a }), /* @__PURE__ */ T("span", { children: typeof i == "number" ? `${Math.round(i)}%` : "" })]
			})
		]
	}), /* @__PURE__ */ T(Q, {
		open: e,
		onClose: t,
		disableDismiss: s,
		maxWidth: l ?? (n === "circle" ? 300 : 360),
		className: L("oui-progress-dialog", `oui-progress-dialog--${n}`, c),
		"aria-label": u ?? (typeof r == "string" ? r : "Loading"),
		children: d
	});
}
//#endregion
//#region src/components/GridMenuDialog.tsx
function Pe({ open: e, onClose: t, items: n, columns: r = 4, title: i, disableDismiss: a = !1, maxWidth: o, className: s, "aria-label": c }) {
	return /* @__PURE__ */ T(Q, {
		open: e,
		onClose: t,
		title: i,
		disableDismiss: a,
		maxWidth: o ?? 400,
		className: L("oui-grid-menu", s),
		"aria-label": c ?? (typeof i == "string" ? i : "Menu"),
		children: /* @__PURE__ */ T("div", {
			className: "oui-grid-menu__grid",
			style: { "--oui-grid-columns": r },
			role: "menu",
			children: n.map((e) => /* @__PURE__ */ E("button", {
				type: "button",
				role: "menuitem",
				className: "oui-grid-menu__item oui-press",
				disabled: e.disabled,
				onClick: () => {
					e.onClick?.(), t?.();
				},
				children: [/* @__PURE__ */ E("span", {
					className: "oui-grid-menu__icon",
					"aria-hidden": "true",
					children: [e.icon, e.badge != null && e.badge !== "" ? /* @__PURE__ */ T("span", {
						className: "oui-grid-menu__badge",
						children: e.badge
					}) : null]
				}), /* @__PURE__ */ T("span", {
					className: "oui-grid-menu__label",
					children: e.label
				})]
			}, e.key))
		})
	});
}
//#endregion
//#region src/components/RelatedCard.tsx
function Fe({ title: e, links: t, onLinkClick: n, className: r }) {
	let i = I();
	return /* @__PURE__ */ E("section", {
		className: L("oui-related-card", r),
		children: [/* @__PURE__ */ T("h3", {
			className: "oui-related-card__title",
			children: e ?? i.relatedDescription
		}), /* @__PURE__ */ T("div", {
			className: "oui-related-card__links",
			children: t.map((e, t) => {
				let r = /* @__PURE__ */ T("span", {
					className: "oui-related-card__label",
					children: e.label
				}), i = () => {
					n?.(e, t), e.onClick?.();
				};
				return e.href ? /* @__PURE__ */ T("a", {
					className: "oui-related-card__link oui-press",
					href: e.href,
					onClick: i,
					children: r
				}, e.key ?? `${e.label}-${t}`) : /* @__PURE__ */ T("button", {
					type: "button",
					className: "oui-related-card__link oui-press",
					onClick: i,
					children: r
				}, e.key ?? `${e.label}-${t}`);
			})
		})]
	});
}
//#endregion
//#region src/components/TipPopup.tsx
function Ie({ open: e, anchor: t, onClose: n, children: r, action: i, placement: a = "top", disableDismiss: o = !1, className: s }) {
	let c = x(null), [l, u] = S(null);
	B(e && !o, () => n?.());
	let d = h(() => {
		let e = V(t), n = c.current;
		if (!e || !n) return;
		let r = n.getBoundingClientRect(), i = a, o = i === "top" ? e.top - r.height - 14 : e.bottom + 14;
		i === "top" && e.top < r.height + 28 ? (i = "bottom", o = e.bottom + 14) : i === "bottom" && e.bottom + r.height + 28 > window.innerHeight && (i = "top", o = e.top - r.height - 14);
		let s = e.left + e.width / 2, l = R(s - r.width / 2, 10, window.innerWidth - r.width - 10), d = R(s - l, 14, r.width - 14);
		u({
			top: o,
			left: l,
			arrowX: d,
			place: i
		});
	}, [t, a]);
	return y(() => {
		if (!e) {
			u(null);
			return;
		}
		d();
	}, [e, d]), _(() => {
		if (!e) return;
		let t = () => d();
		return window.addEventListener("scroll", t, !0), window.addEventListener("resize", t), () => {
			window.removeEventListener("scroll", t, !0), window.removeEventListener("resize", t);
		};
	}, [e, d]), _(() => {
		if (!e || o || !H) return;
		let t = (e) => {
			let t = c.current;
			t && !t.contains(e.target) && n?.();
		};
		return document.addEventListener("pointerdown", t), () => document.removeEventListener("pointerdown", t);
	}, [
		e,
		o,
		n
	]), !e || !H ? null : D(/* @__PURE__ */ E("div", {
		ref: c,
		className: L("oui-tip", s, l ? `oui-tip--${l.place}` : void 0),
		role: "tooltip",
		style: l ? {
			top: l.top,
			left: l.left,
			"--oui-tip-arrow-x": `${l.arrowX}px`
		} : {
			top: -9999,
			left: -9999,
			visibility: "hidden"
		},
		children: [
			/* @__PURE__ */ T("div", {
				className: "oui-tip__message",
				children: r
			}),
			i ? /* @__PURE__ */ T("button", {
				type: "button",
				className: "oui-tip__action oui-press",
				onClick: () => {
					i.onClick?.(), n?.();
				},
				children: i.label
			}) : null,
			/* @__PURE__ */ T("span", {
				className: "oui-tip__arrow",
				"aria-hidden": "true"
			})
		]
	}), document.body);
}
//#endregion
//#region src/components/PreferenceGroup.tsx
function Le({ title: e, variant: t = "flat", className: n, children: r }) {
	return /* @__PURE__ */ E("div", {
		className: L("oui-pref-group", t === "card" && "oui-pref-group--card", n),
		children: [e != null && e !== "" ? /* @__PURE__ */ T("div", {
			className: "oui-pref-group__subheader",
			role: "presentation",
			children: e
		}) : null, /* @__PURE__ */ T("div", {
			className: "oui-pref-group__items",
			children: r
		})]
	});
}
//#endregion
//#region src/components/Preference.tsx
function $({ icon: e, title: t, summary: n, end: r, onClick: i, disabled: a = !1, selected: o = !1, className: s, children: c }) {
	let l = !!i && !a;
	return /* @__PURE__ */ E("div", {
		className: L("oui-pref", l && "oui-pref--interactive oui-press", a && "is-disabled", o && "is-selected", e ? "has-icon" : "no-icon", s),
		role: l ? "button" : void 0,
		tabIndex: l ? 0 : void 0,
		"aria-disabled": a || void 0,
		onClick: l ? (e) => {
			i?.(e);
		} : void 0,
		onKeyDown: l ? (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i?.(e));
		} : void 0,
		children: [
			e == null ? null : /* @__PURE__ */ T("div", {
				className: "oui-pref__icon",
				children: e
			}),
			/* @__PURE__ */ E("div", {
				className: "oui-pref__text",
				children: [
					/* @__PURE__ */ T("div", {
						className: "oui-pref__title",
						children: t
					}),
					n != null && n !== "" ? /* @__PURE__ */ T("div", {
						className: "oui-pref__summary",
						children: n
					}) : null,
					c
				]
			}),
			r == null ? null : /* @__PURE__ */ T("div", {
				className: "oui-pref__end",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/SwitchPreference.tsx
function Re({ checked: e, defaultChecked: t, onChange: n, disabled: r, title: i, ...a }) {
	return /* @__PURE__ */ T($, {
		...a,
		title: i,
		disabled: r,
		onClick: r ? void 0 : () => n?.(!e),
		className: ["oui-pref-switch", a.className].filter(Boolean).join(" "),
		end: /* @__PURE__ */ T(q, {
			checked: e,
			defaultChecked: t,
			onChange: n,
			disabled: r,
			label: typeof i == "string" ? i : void 0,
			onClick: (e) => e.stopPropagation()
		})
	});
}
//#endregion
//#region src/components/SliderPreference.tsx
function ze({ value: e, onChange: t, min: n, max: r, step: i, showValue: a = !0, units: o, formatValue: s, stepper: c = !1, ticks: l = !1, title: u, summary: d, disabled: f, className: p, ...m }) {
	return /* @__PURE__ */ T($, {
		...m,
		className: ["oui-pref-slider", p].filter(Boolean).join(" "),
		title: u,
		summary: d,
		disabled: f,
		children: /* @__PURE__ */ T("div", {
			className: "oui-pref-slider__controls",
			children: /* @__PURE__ */ T(je, {
				value: e,
				onChange: t,
				min: n,
				max: r,
				step: i,
				disabled: f,
				ticks: l,
				stepper: c,
				showValue: a,
				units: o,
				formatValue: s,
				label: typeof u == "string" ? u : void 0
			})
		})
	});
}
//#endregion
//#region src/components/DescriptionPreference.tsx
function Be({ children: e, variant: t = "body", className: n }) {
	return /* @__PURE__ */ T("div", {
		className: L("oui-pref-description", t === "subheader" && "oui-pref-description--subheader", n),
		children: e
	});
}
//#endregion
//#region src/components/HorizontalRadioPreference.tsx
function Ve({ options: e, value: t, onChange: n, withImages: r = !1, label: i, className: a }) {
	return /* @__PURE__ */ T("div", {
		className: L("oui-hradio", r && "oui-hradio--image", a),
		role: "radiogroup",
		"aria-label": i,
		children: e.map((e) => {
			let r = e.value === t;
			return /* @__PURE__ */ E("button", {
				type: "button",
				role: "radio",
				"aria-checked": r,
				disabled: e.disabled,
				className: L("oui-hradio__item", r && "is-selected"),
				onClick: () => n?.(e.value),
				children: [
					e.image ? /* @__PURE__ */ T("span", {
						className: "oui-hradio__image",
						"aria-hidden": "true",
						children: e.image
					}) : null,
					/* @__PURE__ */ T("span", {
						className: "oui-hradio__title",
						children: e.label
					}),
					e.subtitle ? /* @__PURE__ */ T("span", {
						className: "oui-hradio__subtitle",
						children: e.subtitle
					}) : null,
					/* @__PURE__ */ T("span", {
						className: "oui-hradio__radio",
						"aria-hidden": "true"
					})
				]
			}, e.value);
		})
	});
}
//#endregion
//#region src/components/TipsCard.tsx
function He({ title: e, summary: t, children: n, actions: r, onClose: i, className: a }) {
	return /* @__PURE__ */ E("div", {
		className: L("oui-tips", a),
		children: [
			e == null ? null : /* @__PURE__ */ E("div", {
				className: "oui-tips__header",
				children: [/* @__PURE__ */ T("h3", {
					className: "oui-tips__title",
					children: e
				}), i ? /* @__PURE__ */ T("button", {
					type: "button",
					className: "oui-tips__close",
					"aria-label": "Close",
					onClick: i,
					children: /* @__PURE__ */ T(s, {})
				}) : null]
			}),
			t == null ? null : /* @__PURE__ */ T("p", {
				className: "oui-tips__summary",
				children: t
			}),
			n ? /* @__PURE__ */ T("div", {
				className: "oui-tips__children",
				children: n
			}) : null,
			r && r.length > 0 ? /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T("div", { className: "oui-tips__spacer" }), /* @__PURE__ */ T("div", {
				className: "oui-tips__actions",
				children: r.map((e) => /* @__PURE__ */ T("button", {
					type: "button",
					className: "oui-tips__button",
					onClick: e.onClick,
					children: e.label
				}, e.label))
			})] }) : /* @__PURE__ */ T("div", { className: "oui-tips__spacer" })
		]
	});
}
//#endregion
//#region src/components/ColorPickerPreference.tsx
var Ue = [
	"#000000",
	"#3a3a3a",
	"#666666",
	"#9e9e9e",
	"#cfcfcf",
	"#ffffff",
	"#db332a",
	"#ef5e16",
	"#f4b400",
	"#14a866",
	"#0381fe",
	"#3e91ff",
	"#7e57c2",
	"#d81b60",
	"#8d6e63",
	"#607d8b"
];
function We({ value: e, onChange: t, swatches: n = Ue, showAlpha: r = !1, alpha: i = 1, onAlphaChange: a, title: o, summary: s, disabled: c, className: l, ...u }) {
	let d = (e) => [
		"#ffffff",
		"#cfcfcf",
		"#f4b400"
	].includes(e.toLowerCase());
	return /* @__PURE__ */ T($, {
		...u,
		className: L("oui-color-picker-pref", l),
		title: o,
		summary: s,
		disabled: c,
		children: /* @__PURE__ */ E("div", {
			className: "oui-color-picker",
			children: [/* @__PURE__ */ T("div", {
				className: "oui-color-picker__grid",
				role: "radiogroup",
				children: n.map((n) => /* @__PURE__ */ T("button", {
					type: "button",
					role: "radio",
					"aria-checked": n === e,
					"aria-label": n,
					disabled: c,
					className: L("oui-color-picker__swatch", n === e && "is-selected", d(n) && "is-light"),
					style: { "--swatch": n },
					onClick: () => t?.(n)
				}, n))
			}), r ? /* @__PURE__ */ E("div", {
				className: "oui-color-picker__alpha",
				children: [/* @__PURE__ */ T("input", {
					type: "range",
					min: 0,
					max: 100,
					value: Math.round(i * 100),
					disabled: c,
					"aria-label": "Alpha",
					onChange: (e) => a?.(Number(e.target.value) / 100)
				}), /* @__PURE__ */ E("span", {
					className: "oui-color-picker__alpha-value",
					children: [Math.round(i * 100), "%"]
				})]
			}) : null]
		})
	});
}
//#endregion
export { Oe as AppInfo, Ce as BottomNav, oe as Button, X as CircularProgress, We as ColorPickerPreference, Be as DescriptionPreference, Q as Dialog, Me as DialogButton, we as Drawer, Pe as GridMenuDialog, Ve as HorizontalRadioPreference, d as IconAdd, o as IconAppInfo, l as IconBack, e as IconCheck, s as IconClose, u as IconFolder, t as IconHome, i as IconMenu, f as IconMore, n as IconPerson, r as IconRemove, c as IconSearch, a as IconSettings, Ee as LinearProgress, N as OneUIProvider, Se as Page, $ as Preference, Le as PreferenceGroup, De as ProgressBar, Ne as ProgressDialog, te as ROUND_ALL, re as ROUND_BOTTOM, K as ROUND_BOTTOM_LEFT, ee as ROUND_BOTTOM_RIGHT, U as ROUND_NONE, ne as ROUND_TOP, W as ROUND_TOP_LEFT, G as ROUND_TOP_RIGHT, Fe as RelatedCard, ae as RoundBox, le as Separator, je as Slider, ze as SliderPreference, Te as Splash, q as Switch, se as SwitchBar, ce as SwitchBarAction, Re as SwitchPreference, ke as Tabs, Ie as TipPopup, He as TipsCard, xe as Toast, R as clamp, ye as clearToasts, L as cx, k as defaultStrings, ve as dismissToast, A as mergeStrings, _e as toast, P as useOneUI, I as useStrings, F as useTheme };

//# sourceMappingURL=oneui-react.js.map