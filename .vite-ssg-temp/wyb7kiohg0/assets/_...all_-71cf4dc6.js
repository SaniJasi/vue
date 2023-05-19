import { _ as _export_sfc, P as Popup, u as useTodoListStore } from "../main.mjs";
import { ref, reactive, computed, provide, resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from "vue/server-renderer";
import "vite-ssg";
import "pinia";
import "pinia-plugin-persistedstate";
const ____all__vue_vue_type_style_index_0_scoped_e9f0bf08_lang = "";
const _sfc_main = {
  components: {
    Popup
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const todoListStore = useTodoListStore();
    const showPopup = ref(false);
    const editItem = ref(false);
    const checkedFields = ref([]);
    const editableFields = reactive({});
    const newName = ref("");
    const originalFields = ref([]);
    const getTodoByName = (name2) => {
      return todoListStore.getTodoByName(name2);
    };
    const name = computed(() => route.params.all[1]);
    const todo = computed(() => getTodoByName(name.value));
    const deleteItem = () => {
      if (todo.value) {
        todoListStore.deleteItem(todo.value.id);
        router.push("/");
      }
    };
    const confirmDelete = () => {
      showPopup.value = true;
    };
    const editFields = () => {
      if (!editItem.value) {
        originalFields.value = [...todo.value.item.todos];
      } else {
        todo.value.item.todos = [...originalFields.value];
      }
      editItem.value = !editItem.value;
    };
    const cancelDelete = () => {
      showPopup.value = false;
    };
    const addField = () => {
      todo.value.item.todos.push({ name: "", checked: false });
    };
    const removeField = (index) => {
      todo.value.item.todos.splice(index, 1);
    };
    const saveChanges = () => {
      if (todo.value && todo.value.item) {
        const updatedFields = todo.value.item.todos.map((field) => {
          return {
            name: field.name,
            checked: checkedFields.value.includes(field.name)
          };
        });
        if (newName.value.length > 0) {
          router.push(`/todo/${newName.value}`);
        } else {
          newName.value = name.value;
        }
        const updatedTodo = {
          ...todo.value,
          item: {
            ...todo.value.item,
            name: newName.value,
            fields: updatedFields
          }
        };
        console.log(updatedTodo.item.todos);
        editItem.value = false;
        todoListStore.updateItem(updatedTodo);
      }
    };
    provide("popup", showPopup);
    return {
      todo,
      editItem,
      deleteItem,
      confirmDelete,
      cancelDelete,
      saveChanges,
      editFields,
      newName,
      addField,
      removeField,
      name,
      editableFields
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Popup = resolveComponent("Popup");
  _push(`<!--[-->`);
  if ($setup.todo) {
    _push(`<div class="single-todo" data-v-e9f0bf08><div class="single-todo__title" data-v-e9f0bf08>`);
    if (!$setup.editItem) {
      _push(`<h1 data-v-e9f0bf08>${ssrInterpolate($setup.name)}</h1>`);
    } else {
      _push(`<input${ssrRenderAttr("value", $setup.newName)}${ssrRenderAttr("placeholder", $setup.name)} data-v-e9f0bf08>`);
    }
    _push(`</div>`);
    if ($setup.todo && $setup.todo.item) {
      _push(`<ul data-v-e9f0bf08><!--[-->`);
      ssrRenderList($setup.todo.item.todos, (field, index) => {
        _push(`<li data-v-e9f0bf08><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(field.checked) ? ssrLooseContain(field.checked, null) : field.checked) ? " checked" : ""} data-v-e9f0bf08>`);
        if (!$setup.editItem) {
          _push(`<span data-v-e9f0bf08>${ssrInterpolate(field.name)}</span>`);
        } else {
          _push(`<input type="text"${ssrRenderAttr("value", field.name)}${ssrRenderAttr("placeholder", field.name)} required data-v-e9f0bf08>`);
        }
        if ($setup.editItem) {
          _push(`<button class="remove-me" data-v-e9f0bf08><svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" data-v-e9f0bf08><path d="M488.110569,399.973984 L787.219512,100.852033 C795.447154,92.6178862 799.986992,81.6325203 800,69.9186992 C800,58.198374 795.460163,47.2 787.219512,38.9788618 L761.00813,12.7739837 C752.76748,4.5203252 741.782114,0 730.055285,0 C718.347967,0 707.362602,4.5203252 699.121951,12.7739837 L400.013008,311.876423 L100.891057,12.7739837 C92.6634146,4.5203252 81.6715447,0 69.9512195,0 C58.2439024,0 47.2520325,4.5203252 39.0243902,12.7739837 L12.8,38.9788618 C-4.26666667,56.0455285 -4.26666667,83.804878 12.8,100.852033 L311.915447,399.973984 L12.8,699.082927 C4.56585366,707.330081 0.0325203252,718.315447 0.0325203252,730.029268 C0.0325203252,741.743089 4.56585366,752.728455 12.8,760.969106 L39.0178862,787.173984 C47.2455285,795.421138 58.2439024,799.947967 69.9447154,799.947967 C81.6650407,799.947967 92.6569106,795.421138 100.884553,787.173984 L400.006504,488.065041 L699.115447,787.173984 C707.356098,795.421138 718.341463,799.947967 730.04878,799.947967 L730.061789,799.947967 C741.77561,799.947967 752.760976,795.421138 761.001626,787.173984 L787.213008,760.969106 C795.44065,752.734959 799.980488,741.743089 799.980488,730.029268 C799.980488,718.315447 795.44065,707.330081 787.213008,699.089431 L488.110569,399.973984 Z" transform="translate(0 .026)" data-v-e9f0bf08></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.editItem) {
      _push(`<button class="btn btn--secondary" data-v-e9f0bf08>Add Todo</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="todo-controls" data-v-e9f0bf08><button class="btn btn--red" data-v-e9f0bf08>Remove</button><button class="btn btn--secondary" data-v-e9f0bf08>${ssrInterpolate($setup.editItem ? "Cancel" : "Edit")}</button><button class="btn btn--primary" data-v-e9f0bf08>Save</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_Popup, {
    "is-open": _ctx.showPopup,
    onConfirm: $setup.deleteItem,
    onCancel: $setup.cancelDelete
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p data-v-e9f0bf08${_scopeId}>Are you sure you want to delete this item?</p>`);
      } else {
        return [
          createVNode("p", null, "Are you sure you want to delete this item?")
        ];
      }
    }),
    _: 1
    /* STABLE */
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/[...all].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____all_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e9f0bf08"], ["__file", "/Users/a51.hs/Desktop/vue-todo/src/pages/[...all].vue"]]);
export {
  ____all_ as default
};
