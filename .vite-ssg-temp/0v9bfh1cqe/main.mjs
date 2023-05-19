import { ViteSSG } from "vite-ssg";
import { defineStore, createPinia } from "pinia";
import "pinia-plugin-persistedstate";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext, inject, ref, mergeProps, computed, provide, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, unref } from "vue";
import { RouterLink, RouterView } from "vue-router";
const main = "";
const PopupConfirmation_vue_vue_type_style_index_0_scoped_2ed80e1e_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {
  setup() {
    const isOpen = inject("popup", ref(false));
    return {
      isOpen
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.isOpen) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "popup" }, _attrs))} data-v-2ed80e1e><div class="popup__content" data-v-2ed80e1e>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`<div class="popup__actions" data-v-2ed80e1e><button class="btn btn--red" data-v-2ed80e1e>Yes</button><button class="btn btn--secondary" data-v-2ed80e1e>No</button></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PopupConfirmation.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2ed80e1e"], ["__file", "/Users/a51.hs/Desktop/vue-todo/src/components/PopupConfirmation.vue"]]);
const useTodoListStore = defineStore("todoList", {
  state: () => ({
    todoList: [],
    id: 0
  }),
  actions: {
    initialize() {
      return this.todoList;
    },
    addItem(item) {
      this.todoList.push({ item, id: this.id++, completed: false });
    },
    deleteItem(itemId) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemId;
      });
    },
    updateItem(updatedTodo) {
      this.todoList.map((obj) => {
        if (obj.id === updatedTodo.id) {
          obj.item = { ...obj.item, ...updatedTodo.item };
        }
        return obj;
      });
    }
  },
  getters: {
    getTodoByName: (state) => {
      return (name) => state.todoList.find((todo) => todo.item.name.toLowerCase().replaceAll(" ", "-") === name);
    }
  },
  persist: true
});
const _sfc_main$3 = {
  components: {
    Popup
  },
  setup() {
    const todoListStore = useTodoListStore();
    const showPopup = ref(false);
    let currentTodo = null;
    const handleConfirm = () => {
      if (currentTodo) {
        todoListStore.deleteItem(currentTodo.id);
      }
      hideRemovePopup();
    };
    const handleCancel = () => {
      hideRemovePopup();
    };
    const showRemovePopup = (todo) => {
      currentTodo = todo;
      showPopup.value = true;
    };
    const hideRemovePopup = () => {
      showPopup.value = false;
    };
    const computedTodoList = computed(() => todoListStore.todoList);
    provide("popup", showPopup);
    return {
      computedTodoList,
      showRemovePopup,
      hideRemovePopup,
      handleConfirm,
      handleCancel
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_Popup = resolveComponent("Popup");
  _push(`<!--[--><h1>Todo List</h1><ul class="todo-list"><!--[-->`);
  ssrRenderList($setup.computedTodoList, (todo) => {
    var _a;
    _push(`<li><h2>`);
    _push(ssrRenderComponent(_component_router_link, {
      to: `/todo/${todo.item.name.toLowerCase().replaceAll(" ", "-")}`
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(todo.item.name)}`);
        } else {
          return [
            createTextVNode(
              toDisplayString(todo.item.name),
              1
              /* TEXT */
            )
          ];
        }
      }),
      _: 2
      /* DYNAMIC */
    }, _parent));
    _push(`</h2><!--[-->`);
    ssrRenderList((_a = todo.item.todos) == null ? void 0 : _a.slice(0, 3), (field, index) => {
      _push(`<div><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(field.checked) ? ssrLooseContain(field.checked, null) : field.checked) ? " checked" : ""} disabled> ${ssrInterpolate(field.name)}</div>`);
    });
    _push(`<!--]--><div class="todo-list__remove"><button class="btn btn--red">Remove</button>`);
    _push(ssrRenderComponent(_component_router_link, {
      to: `/todo/${todo.item.name}`,
      class: "btn btn--outline"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`View`);
        } else {
          return [
            createTextVNode("View")
          ];
        }
      }),
      _: 2
      /* DYNAMIC */
    }, _parent));
    _push(`</div></li>`);
  });
  _push(`<!--]--></ul>`);
  _push(ssrRenderComponent(_component_Popup, {
    isOpen: _ctx.showPopup,
    onConfirm: $setup.handleConfirm,
    onCancel: $setup.handleCancel
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p${_scopeId}>Are you sure you want to remove this item?</p>`);
      } else {
        return [
          createVNode("p", null, "Are you sure you want to remove this item?")
        ];
      }
    }),
    _: 1
    /* STABLE */
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/TodoList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const TodoList = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender], ["__file", "/Users/a51.hs/Desktop/vue-todo/src/components/TodoList.vue"]]);
const _sfc_main$2 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(TodoList, _attrs, null, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __pages_import_0__ = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/Users/a51.hs/Desktop/vue-todo/src/pages/index.vue"]]);
const __pages_import_1__ = () => import("./assets/create-6a7a54ad.js");
const __pages_import_2__ = () => import("./assets/_...all_-71cf4dc6.js");
const routes = [{ "name": "index", "path": "/", "component": __pages_import_0__, "props": true }, { "name": "create", "path": "/create", "component": __pages_import_1__, "props": true }, { "name": "all", "path": "/:all(.*)*", "component": __pages_import_2__, "props": true }];
const _imports_0 = "/assets/logo-277e0e97.svg";
const HeaderSection_vue_vue_type_style_index_0_scoped_5f378fbb_lang = "";
const _sfc_main$1 = {
  __name: "HeaderSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "site-header" }, _attrs))} data-v-5f378fbb>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/",
        class: "site-header__logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="" data-v-5f378fbb${_scopeId}><span data-v-5f378fbb${_scopeId}>Todo list</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: ""
              }),
              createVNode("span", null, "Todo list")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/create",
        class: "btn btn--primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create item`);
          } else {
            return [
              createTextVNode("Create item")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/HeaderSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5f378fbb"], ["__file", "/Users/a51.hs/Desktop/vue-todo/src/components/HeaderSection.vue"]]);
const _sfc_main = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, null, _parent));
      _push(`<main>`);
      _push(ssrRenderComponent(unref(RouterView), null, null, _parent));
      _push(`</main><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/a51.hs/Desktop/vue-todo/src/App.vue"]]);
const createApp = ViteSSG(App, { routes }, ({ app, router, initialState }) => {
  const pinia = createPinia();
  app.use(pinia);
  {
    initialState.pinia = pinia.state.value;
  }
  router.beforeEach((to, from, next) => {
    const store = useTodoListStore(pinia);
    if (!store.ready)
      store.initialize();
    next();
  });
});
export {
  Popup as P,
  _export_sfc as _,
  createApp,
  useTodoListStore as u
};
