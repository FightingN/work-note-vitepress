# vue3 学习

## setup

- 创建组件实例，然后初始化 props，紧接着调用 setup 函数。它会在 beforeCreate 钩子之前调用。

::: danger 注意
在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。
:::

- setup 返回一个对象。则对象的所有属性(它是响应式的数据)都可以直接在模板中使用。相当于 vue2.0 中 data 函数返回的对象。

```vue
<script>
export default {
  setup() {
    return {};
  },
};
</script>
```

## ref

- ref：可传入任意类型的值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性.value,改变值的时候必须使用其 value 属性

```vue
<template>
  <div>{{ num }}</div>
  <button @click="addFunction">计算</button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const num = ref(0);
    const addFunction = () => {
      num.value++;
    };
    return {
      num,
      addFunction,
    };
  },
};
</script>
```

## reactive

- reactive:接受一个普通对象然后返回该普通对象的响应式代理

::: tip
简写之：reactive 负责复杂数据结构，ref 可以把基本的数据结构包装成响应式
:::

```vue
<template>
  <div>{{ state.count }}</div>
  <button @click="addFunction">计算</button>
</template>

<script lang="ts">
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      count: 0,
    });
    const addFunction = () => {
      state.count++;
    };
    return {
      state,
      addFunction,
    };
  },
};
</script>
```

## toRefs

- 解构对象

```vue
<template>
  <div>{{ count }}</div>
  <button @click="addFunction">计算</button>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      count: 0,
    });
    const addFunction = () => {
      state.count++;
    };
    return {
      ...toRefs(state),
      addFunction,
    };
  },
};
</script>
```

## 生命周期钩子

<!-- <img :src="$withBase('/image/vue/vue14.png')" alt=""> -->

```vue
<template>
  <div>{{ count }}</div>
  <button @click="addFunction">计算</button>
  <div id="test">0000</div>
</template>
<script>
import {
  reactive,
  toRefs,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default {
  // 初始化数据阶段的生命周期，介于beforeCreate和created之间
  setup() {
    console.log("setup--------");
    const state = reactive({
      count: 0,
    });
    const addFunction = () => {
      state.count++;
    };
    onBeforeMount(() => {
      console.log("组件挂载之前");
    });
    onMounted(() => {
      console.log("DOM挂载完成");
    });
    onBeforeUpdate(() => {
      console.log("DOM更新之前", document.getElementById("test").innerHTML);
    });
    onUpdated(() => {
      console.log("DOM更新完成", document.getElementById("test").innerHTML);
    });
    onBeforeUnmount(() => {
      console.log("实例卸载之前");
    });
    onUnmounted(() => {
      console.log("实例卸载之后");
    });

    return {
      ...toRefs(state),
      addFunction,
    };
  },
};
</script>
```

## watch

- 在 Vue3 中的组合式 API 中，watch 的作用和 Vue2 中的 watch 作用是一样的，他们都是用来监听响应式状态发生变化的，当响应式状态发生变化时，都会触发一个回调函数。

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">更改message</button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
const message = ref("我的");
const changeMessage = () => {
  message.value = "变了";
};
watch(message, (newValue, oldValue) => {
  console.log("新的值:", newValue);
  console.log("旧的值:", oldValue);
});
</script>
```

- 上段代码中我们点击按钮就会更改响应式变量 message 的值。我们又使用 watch 监听器监听了 message 变量，当它发生变化时，就会触发 watch 监听函数中的回调函数，并且回调函数默认接收两个参数：新值和旧值。

:::tip
注意：当我们第一进入页面时，watch 监听函数的回调函数是不会执行的。
:::

### watch 监听类型

- 前面我们一直强调 watch 监听的是响应式数据，如果我们监听的数据不是响应式的，那么可能会抛出警告：
- watch 监听器可以监听哪些形式的数据呢？

#### ref 和计算属性

- ref 定义的数据我们是可以监听到的，因为我们前面的代码以及证明了。除此之外，计算属性也是可以监听到的

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">更改message</button>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

const message = ref("我的");

const newMessage = computed(() => {
  return message.value;
});

const changeMessage = () => {
  message.value = "变了";
};

watch(message, (newValue, oldValue) => {
  console.log("新的值:", newValue);
  console.log("旧的值:", oldValue);
});

watch(newMessage, (newValue, oldValue) => {
  console.log("newMessage新的值:", newValue);
  console.log("newMessage旧的值:", oldValue);
});
</script>
```

- 当我们 message 发生变化时，计算属性 newMessage 也会重新计算得出新的结果，我们 watch 监听函数是可以监听到计算属性变化的。

#### getter 函数

- 这里的 getter 函数大家可以简单的理解为获取数据的一个函数，说白了该函数就是一个返回值的操作，有点类似与计算属性。

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">更改message</button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const message = ref("我的");

const changeMessage = () => {
  message.value = "变了";
};

watch(
  () => message.value,
  (newValue, oldValue) => {
    console.log("新的值:", newValue);
    console.log("旧的值:", oldValue);
  }
);
</script>
```

#### 监听响应式对象

- 前面我们监听的都是值类型的响应式数据，我们同样也可以监听响应式的对象。

```vue
<template>
  <div>
    <p>{{ number.count }}</p>
    <button @click="changeNumber">更改message</button>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
const number = reactive({
  count: 0,
});
const changeNumber = () => {
  number.count++;
};

watch(number, (newValue, oldValue) => {
  console.log("新值", newValue);
  console.log("旧值", oldValue);
});
</script>
```

<!-- <img :src="$withBase('/image/vue/vue15.png')" alt=""> -->

- 当 watch 监听的是一个响应式对象时，会隐式地创建一个深层侦听器，即该响应式对象里面的任何属性发生变化，都会触发监听函数中的回调函数。

:::tip
需要注意的，watch 不能直接监听响应式对象的属性，即下面的写法是错误的
:::

```vue
<script setup lang="ts">
const number = reactive({ count: 0 });
const countAdd = () => {
  number.count++;
};
watch(number.count, (newValue, oldValue) => {
  console.log("新的值:", newValue);
  console.log("旧的值:", oldValue);
});
</script>
```

- 上段代码中相当于你直接向 watch 传递了一个非响应式的数字，然而 watch 只能监听响应式数据
- 如果我们非要监听响应式对象中的某个属性，我们可以使用 getter 函数的形式，代码如下：

```vue
<script setup lang="ts">
watch(
  () => number.count,
  (newValue, oldValue) => {
    console.log("新的值:", newValue);
    console.log("旧的值:", oldValue);
  }
);
</script>
```

- 这种监听出来的新值旧值是不一样的

#### 监听多个来源的数组

- watch 还可以监听数组，前提是这个数组内部含有响应式数据

```vue
<template>
  <div>
    <p>{{ number.count }}----{{ x1 }}</p>
    <button @click="changeNumber">更改message</button>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
const x1 = ref(10);
const number = reactive({
  count: 0,
});
const changeNumber = () => {
  number.count++;
  x1.value++;
};

watch([x1, () => number.count], ([newCount, newNum], [oldCount, oldNum]) => {
  console.log("new:", newCount, newNum);
  console.log("old:", oldCount, oldNum);
});
</script>
```

### 深度监听

- 在前面的代码中，如果我们将一个响应式对象传递给 watch 监听器时，只要对象里面的某个属性发生了变化，那么就会执行监听器回调函数。
- 究其原因，因为我们传入响应对象给 watch 时，隐式的添加一个深度监听器，这就让我们造成了我们牵一发而至全身的效果。
- 但是，如果我们是使用的 getter 函数返回响应式对象的形式，那么响应式对象的属性值发生变化，是不会触发 watch 的回调函数的。

```js
const number = reactive({ count: 0 });
const countAdd = () => {
  number.count++;
};
watch(
  () => number,
  (newValue, oldValue) => {
    console.log("新的值:", newValue);
    console.log("旧的值:", oldValue);
  }
);
```

- 上段代码中我们使用 getter 函数返回了响应式对象，当我们更改 number 中 count 的值时，watch 的回调函数是不会执行的。
- 为了实现上述代码的监听，我们可以手动给监听器加上深度监听的效果

```js
const number = reactive({ count: 0 });
const countAdd = () => {
  number.count++;
};
watch(
  () => number,
  (newValue, oldValue) => {
    console.log("新的值:", newValue);
    console.log("旧的值:", oldValue);
  },
  { deep: true }
);
```

- 添加深度监听很简单，只需要给 watch 添加第三个参数即可：{ deep: true }。
- 但是输出结果是

<!-- <img :src="$withBase('/image/vue/vue15.png')" alt=""></img> -->

:::tip
注意： 上段代码中的 newValue 和 oldValue 的值是一样的，除非我们把响应式对象即 number 整个替换掉，那么这两个值才会变得不一样。除此之外，深度监听会遍历响应式对象的所有属性，开销较大，当对象体很大时，需要慎用 。

- 所以我们推荐 getter 函数只返回相应是对象中的某一个属性

:::

## watchEffect

- 我们前面使用 watch 监听数据状态时，不知道大家有没有发现这样一个问题：只有当我们监听的数据源发生了变化，监听函数的回调函数才会执行。但是需求总是多变的，有些场景下我们可能需要刚进页面，或者说第一次渲染页面的时候，watch 监听器里面的回调函数就执行一遍。
  面对这种需求我们怎样处理呢？一般有两种方式

### 方式一：

- 这种方式也是通过 watch 实现的，确切的说是巧妙的实现，而不是依赖于 watch 监听器。

```js
const number = reactive({ count: 0 });
// 进入页面先执行一遍
const callback = () => {
  console.log("新的值:", number.count);
  console.log("旧的值:", number.count);
};
callback();
watch(
  () => number.count,
  (newValue, oldValue) => {
    console.log("新的值:", newValue);
    console.log("旧的值:", oldValue);
  },
  { deep: true }
);
```

- 既然我们想要第一次进入页面的时候就执行一遍回调函数，那么我们不妨把回调函数直接提取出来，进入页面执行一遍即可，这也算是巧妙的实现了我们的需求。

### 方法二

- watchEffect 也是一个监听器，只不过它不会像 watch 那样接收一个明确的数据源，它只接收一个回调函数。而在这个回调函数当中，它会自动监听响应数据，当回调函数里面的响应数据发生变化，回调函数就会立即执行。

```js
const number = reactive({ count: 0 });
const countAdd = () => {
  number.count++;
};
watchEffect(() => {
  console.log("新的值:", number.count);
});
```

- 上段代码中，当我们第一次进入页面时，number 响应数据从无到有，这个时候就会触发 watchEffect 的回调函数，因为在 watchEffect 回调函数中使用了 number 响应数据，所以它会自动跟踪 number 数据的变化。当我们点击按钮更改 count 的值时，watchEffect 中的回调函数便会再次执行。

## watch 和 watchEffect 区别

- 我们已经大概知道了 watch 和 watchEffect 的用法，那么它们之间的区别相信大家也了解了一些，这里我们总结一下它们之间的区别
  - watch 和 watchEffect 都能监听响应式数据的变化，不同的是它们监听数据变化的方式不同。
  - watch 会明确监听某一个响应数据，而 watchEffect 则是隐式的监听回调函数中响应数据。
  - watch 在响应数据初始化时是不会执行回调函数的，watchEffect 在响应数据初始化时就会立即执行回调函数。

## watch 回调中的 DOM

```vue
<template>
  <div>
    <p ref="msgRef">{{ message }}</p>
    <button @click="changeMessage">更改message</button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
const message = ref("我的");
const msgRef = ref<any>(null);
const changeMessage = () => {
  message.value = "变了";
};
watch(message, (newValue, oldValue) => {
  console.log("DOM 节点", msgRef.value.innerHTML);
  console.log("新的值:", newValue);
  console.log("旧的值:", oldValue);
});
</script>
```

- 我们通过点击按钮更改 message 的值，从“我的”变为“变了”。但是我们发现在监听器的回调函数里面获取到的 DOM 元素还是“我的”，说明 DOM 还没有更新。
- 解决方法

  - 如果我们想要在回调函数里面获取更新后的 DOM，非常简单，我们只需要再给监听器多传递一个参数选项即可：flush: 'post'。watch 和 watchEffect 同理。

  ```js
  watch(source, callback, {
    flush: "post",
  });
  watchEffect(callback, {
    flush: "post",
  });
  ```

- 修改后的代码

```js
watch(
  message,
  (newValue, oldValue) => {
    console.log("DOM 节点", msgRef.value.innerHTML);
    console.log("新的值:", newValue);
    console.log("旧的值:", oldValue);
  },
  {
    flush: "post",
  }
);
```

- 这个时候我们在回调函数中获取到的已经是更新后的 DOM 节点了。
  **补充**
- 虽然 watch 和 watchEffect 都可以用上述方法解决 DOM 问题，但是 Vue3 单独给 watchEffect 提供了一个更方便的方法，也可以叫做 watchEffect 的别名，代码如下：

```js
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

## 手动停止监听器

- 通常来说，我们的一个组件被销毁或者卸载后，监听器也会跟着被停止，并不需要我们手动去关闭监听器。但是总是有一些特殊情况，即使组件卸载了，但是监听器依然存在，这个时候其实式需要我们手动关闭它的，否则容易造成内存泄漏。

```js
<script setup>
  import {watchEffect} from 'vue' // 它会自动停止 watchEffect(() => {}) //
  ...这个则不会！ setTimeout(() => {watchEffect(() => {})}, 100)
</script>
```

- 上段代码中我们采用异步的方式创建了一个监听器，这个时候监听器没有与当前组件绑定，所以即使组件销毁了，监听器依然存在。
- 关闭方法很简单

```js
const unwatch = watchEffect(() => {});
// ...当该侦听器不再需要时
unwatch();
```

- 我们需要用一个变量接收监听器函数的返回值，其实就是返回的一个函数，然后我们调用该函数，即可关闭当前监听器。

## computed

```js
import { ref, computed } from "vue";

const counter = ref(0);
// 创建只读的计算属性
const twiceTheCounter = computed(() => counter.value * 2);

counter.value++;
console.log(counter.value); // 1
console.log(twiceTheCounter.value); // 2
```

- 这里我们给 computed 函数传递了第一个参数，它是一个类似 getter 的回调函数，输出的是一个只读的响应式引用
- 创建可读可修改的属性

```vue
<template>
  <div>
    <p>{{ state.count }}</p>
    {{ computedEven2 }}
    <button @click="handleClick">更改message</button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";
const state = reactive({
  count: 1,
});
// 3.创建只读的计算属性
const computedEven1 = computed(() => state.count % 2);

// 4.创建可读可写的计算属性
const computedEven2 = computed({
  get: () => {
    return state.count % 2;
  },
  set: (newVal) => {
    state.count = newVal;
  },
});
function handleClick() {
  computedEven2.value = 20;
}
</script>
```

## 依赖注入

- 它是 vue 提供的一种的新的组件之间的传值方式，相比原来的 props 这种只能在父子组件中传值的方式，provide/inject 依赖注入更像是 props 的加强版，props 只能父组件传子组件，而依赖注入传值可以由父组件传给它的所有后代，以及后代的后代，无论隔着多远，只要是它后代链上的子组件，值都能传到，可以说很强大了。
  :::tip
  有一个需要注意的点就是，它是父子组件这种向下穿透的传值方式，所以兄弟组件之间传值是不能用依赖注入的
  :::
- 下面讲解依赖注入的用法，主要从两个方面来讲，第一种是在非 setup 函数里的用法，第二种在 setup 函数里的用法

### 不定义在 setup 函数里的一般用法

- 父组件提供 provide

```js
<script>
export default {
  provide: {
    user: '张三'
  }
}
</script>
```

- 后代组件注入 inject

```js
<template>
  <div>{{user}}</div>
</template>
<script>
export default {
  inject: ['user']
}
</script>
```

- provide 值是对象的时候，在大括号里是不能用 this 的，会报错，找不到值

```js
<script>
export default {
  data() {
    return {
      user:'张三'
    }
  },
  provide: {
    user: this.user // Uncaught TypeError: Cannot read properties of undefined (reading 'user')
  }
}
</script>
```

- 如果希望使用父组件 data 里的变量来传递，这里有一种更通用的写法，建议各位记住并采用这种写法，忘掉上面那种

```js
<script>
export default {
  data() {
    return {
      user:'张三'
    }
  },
  provide() {
    return {
      user：this.user // 这里的值即可以自定义内容，也可以使用data里的变量值
    }
  }
}
</script>

```

:::tip
这种写法和 data 的函数式写法是一样的，这里只是 provide 端的写法改变，inject 注入的写法还是跟上面的一样。依赖注入是单向数据流的传值方式，即只有从 provide 端改变数值才会改变 inject 端的数值，从 inject 端的改变数值不会影响到 provide 端的值
:::

- 上面 provide 的这种赋值写法，虽然可以引用到父组件的 data 变量，但是它不是响应式的，如果 user 的值改变了，provide 并不能检测到，如果希望 user 值改变的同时能让 provide 检测到并同步更新到 inject 端，这里需要用到计算属性

```js
<script>
import { computed } from 'vue'

export default {
  data() {
    return {
      user:'张三'，
      name: '法外狂徒'
    }
  },
  provide() {
    return {
      user：computed(() => this.user),
      name: computed(() => this.name) // 多条可以依次写，互相之间不干扰
    }
  }
}
</script>
- 这样就可以在user每次变更的时候通知到inject端了

```

### 定义在 setup 函数中的一般用法

- 父组件提供 provide

```js
<script>
import { provide, ref, reactive, readonly } from 'vue' // 需要引入provide

export default {
  setup() {
    const user = ref('张三') // 非引用类型的响应式ref写法
    // const user = ref({name: '张三'}) // 引用类型的响应式ref写法  user.value.name调用
    // const user = reactive({name: '张三'}) // 引用类型的响应式reactive写法， user.name调用
    // const user = '张三' // 非响应式写法
    provide('user', readonly(user)) // readonly是为了防止inject端修改数据影响到provide端
  }
}
</script>

```

- 后代组件注入 inject

```js
<template>
  <div>{{user}}</div>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const user = inject('user')
    return { // 注意，在setup中定义的值需要return出去才能在子组件中直接使用
      user
    }
  }
}
</script>
:::tip
还需要解释的一点是，setup函数中不要使用this，因为setup的调用在data、computed、methods之前，所以用this是取不到组件的变量的
:::

```

- 上述 2 种依赖注入写法混合搭配也能正常传值和取值，例如 provide 端用 setup 写法，inject 端用正常写法；或者 provide 端用正常写法，inject 端用 setup 写法都是可以的，但是不建议实际开发中这样做
- 同一个组件中，存在 setup 写法的 provide 和正常写法的 provide 时，两个 provide 传的值会共存。
  但是如果 2 个 provide 共同传了一个 key 相同，但 value 不同的值，则最终 inject 端只能接收到正常 provide 写法传来的值。

## refs 获取 DOM

```vue
<template>
  <div ref="provide">provide</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
let provide = ref(null);
onMounted(() => {
  console.log("provide", provide.value);
});
</script>
```

## 组件传值

### 父组件给子组件传值

- 父组件给子组件传值，子组件通过 defineProps 接收数据
- 父组件

```vue
<template>
  <Test :msg="msg"></Test>
</template>
<script setup lang="ts">
import Test from "../../components/Test.vue";
import { ref, reactive, onMounted } from "vue";
// const msg = ref<string>('1')
// const data = reactive<number[]>([1, 2, 3])

const msg = ref("1");
const data = reactive<number[]>([1, 2, 3]);
</script>
```

- 子组件接收

```vue
<template>
  <div>{{ msg }}</div>
</template>
<script setup lang="ts">
// 子组件接受值:通过defineProps 来接受 defineProps是无须引入的直接使用即可
// 如果我们使用的TypeScript
// 可以使用传递字面量类型的纯类型语法做为参数
// 如 这是TS特有的
// defineProps<{
//   msg: String
//   data: number[]
// }>()

// 如果不使用ts
defineProps({
  msg: {
    default: "",
    type: String,
  },
  data: Array,
});
</script>
```

### 子组件给父组件传值–emit 方式

- 父组件接收值

```vue
<template>
  <Test :msg="msg" @getChildren="getChildren"></Test>
</template>
<script setup lang="ts">
import Test from "../../components/Test.vue";
import { ref, reactive, onMounted } from "vue";
// const msg = ref<string>('1')
// const data = reactive<number[]>([1, 2, 3])

const msg = ref(1);
const data = reactive<number[]>([1, 2, 3]);

const getChildren = (value: any) => {
  console.log("父组件函数,接收到子组件的值为:", value);
  msg.value = value;
};
</script>
```

- 子组件传值

```vue
<template>
  <div>
    {{ msg }}
    <div @click="onUp(3)">给父组件传值</div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
// 子组件接受值:通过defineProps 来接受 defineProps是无须引入的直接使用即可
// 如果我们使用的TypeScript
// 可以使用传递字面量类型的纯类型语法做为参数
// 如 这是TS特有的
// defineProps<{
//   msg: String
//   data: number[]
// }>()

// 如果不使用ts
defineProps({
  msg: {
    default: 0,
    type: Number,
  },
  data: Array,
});

//setup中使用emits,需要先声明，定义属性数量
const emits = defineEmits(["getChildren"]);
function onUp(n: number) {
  console.log("子组件函数");
  emits("getChildren", n);
}
</script>
```

### 子组件给父组件传值–函数方式

- 父组件 father.vue：

```vue
<div class="father">
    <children :carr="fatherFun" />
 </div>

<script setup>
import children from "./children.vue";

// 通过函数的方式接收值
const fatherFun = (n: number) => {
  console.log("父组件函数,接收到子组件的值为：", n);
};
</script>
```

- 子组件 children.vue

```vue
<div @click="onUp('3')">使用函数carr进行传值</div>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  carr: {
    type: Function,
    required: true,
  }, // 子组件传值的类型
});

function onUp(n: number) {
  console.log("子组件函数");
  props.carr(n); // 传输子组件的值给父组件
}
</script>
/* 结果为： 子组件函数 父组件函数,接收到子组件的值为： 3 */
```

### 兄弟组件传值（ 借助 mitt ）–全局引入

```js
npm install mitt
或者
cnpm install mitt

```

- 在 main.js 中注册“挂载”到全局

```js
import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt"; // 导入mitt

const app = createApp(App);
app.config.globalProperties.$mitt = new mitt(); // mitt在vue3中挂载到全局
app.mount("#app");
```

- 组件发送数据

```vue
<template>
  <h2>子组件1: {{ money }}</h2>
  <button @click="sendMittData">通过$mitt发送数据</button>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";

let { proxy } = getCurrentInstance();
let money = ref(100); // 存储用于发送的数据，money在template中使用时候直接使用，在语法糖中使用时候要用money.value获取其中的数据
function sendMittData() {
  proxy.$mitt.emit("mittFn", money.value);
}
</script>
```

- 组件接收数据

```js
<template>
    <h2>组件2接收mitt发送的数据: {{money}}</h2>
</template>
<script>
	import { ref, getCurrentInstance } from 'vue'

	let { proxy } = getCurrentInstance()
	let money = ref('') // 存储接收到的数据
	proxy.$mitt.on('mittFn', (res) => {
		money.value = res
	})
</script>

```

### 兄弟组件传值（ 借助 mitt ）–局部引入

```js
npm install mitt
或者
cnpm install mitt

```

- 在 mitt.js 文件

```js
import mitt from "mitt"; // 导入mitt

export default new mitt();
```

- 发送数据

```vue
<template>
  <h2>子组件1: {{ money }}</h2>
  <button @click="sendMittData">通过$mitt发送数据</button>
</template>
<script setup>
import { ref } from "vue";
import mitt from "../mitt/index.js";

let money = ref(100); // 存储用于发送的数据，money在template中使用时候直接使用，在语法糖中使用时候要用money.value获取其中的数据
function sendMittData() {
  mitt.emit("mittFn", money.value);
}
</script>
```

- 接收数据

```vue
<template>
  <h2>组件2接收mitt发送的数据: {{ money }}</h2>
</template>
<script>
import { ref } from "vue";
import mitt from "../mitt/index.js";

let money = ref(""); // 存储接收到的数据
mitt.on("mittFn", (res) => {
  money.value = res;
});
</script>
```

## pinia

[官网](https://pinia.vuejs.org/)
[参考链接](https://juejin.cn/post/7057439040911441957)

- pinia 核心概念
  - state: 状态
  - actions: 修改状态（包括同步和异步，pinia 中没有 mutations）
  - getters: 计算属性

### Pinia 的常规用法

- 1. 下载

```js
yarn add pinia
# or with npm
npm install pinia
```

- 2. main.js

```js
import { createPinia } from "pinia";
app.use(createPinia());
```

- 3. 新建文件 store/counter.js

```js
import { defineStore } from "pinia";
// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {},
  actions: {},
});

export default useCounterStore;
```

- 4. 在组件中使用

```js
<script setup>
import useCounterStore from './store/counter'

const counter = useCounterStore()
</script>

<template>
  <h1>根组件---{{ counter.count }}</h1>
</template>

<style></style>

```

### actions 的使用

- 在 pinia 中没有 mutations，只有 actions，不管是同步还是异步的代码，都可以在 actions 中完成。
- 1. 在 actions 中提供方法并且修改数据

```js
import { defineStore } from "pinia";
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 0,
    };
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++;
      }, 1000);
    },
  },
});

export default useCounterStore;
```

- 2.  在组件中使用

```vue
<script setup>
import useCounterStore from "./store/counter";

const counter = useCounterStore();
</script>

<template>
  <h1>根组件---{{ counter.count }}</h1>
  <button @click="counter.increment">加1</button>
  <button @click="counter.incrementAsync">异步加1</button>
</template>
```

### getters 的使用

:::tip
pinia 中的 getters 和 vuex 中的基本是一样的，也带有缓存的功能
:::

1. 在 getters 中提供计算属性

```js
import { defineStore } from "pinia";
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {
    double() {
      return this.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++;
      }, 1000);
    },
  },
});

export default useCounterStore;
```

2. 在组件中使用

```js
  <h1>根组件---{{ counter.count }}</h1>
  <h3>{{ counter.double }}</h3>
```

### storeToRefs 的使用

- 如果直接从 pinia 中解构数据，会丢失响应式， 使用 storeToRefs 可以保证解构出来的数据也是响应式的

```js
<script setup>
  import {storeToRefs} from 'pinia' import useCounterStore from
  './store/counter' const counter = useCounterStore() //
  如果直接从pinia中解构数据，会丢失响应式 const {(count, double)} = counter //
  使用storeToRefs可以保证解构出来的数据也是响应式的 const {(count, double)} =
  storeToRefs(counter)
</script>
```

### pinia 模块化

:::tip
在复杂项目中，不可能把多个模块的数据都定义到一个 store 中，一般来说会一个模块对应一个 store，最后通过一个根 store 进行整合
:::

1. 新建 store/user.js 文件

```js
import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "zs",
      age: 100,
    };
  },
});

export default useUserStore;
```

2. 新建 store/index.js

```js
import useUserStore from "./user";
import useCounterStore from "./counter";

// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore(),
  };
}
```

3. 在组件中使用

```vue
<script setup>
import { storeToRefs } from "pinia";
import useStore from "./store";
const { counter } = useStore();

// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter);
</script>
```

## pinia 持久化

[官网](https://www.npmjs.com/package/pinia-plugin-persistedstate)

1. 下载

```js
yarn add pinia-plugin-persistedstate
or
npm i  pinia-plugin-persistedstate
```

2. 在 main.ts 中注册

```js
import { createApp } from "vue";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia);
```

3. 模块开启持久化

```js
const useHomeStore = defineStore("home", {
  // 开启数据持久化
  persist: true,
  // ...省略
});
```

:::tip

- 模块做了持久化后，以后数据会不会变，怎么办？
  - 先读取本地的数据，如果新的请求获取到新数据，会自动把新数据覆盖掉旧的数据。
  - 无需额外处理，插件会自己更新到最新数据。
    :::

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('main', s{
  state: () => {
    return {
      someState: 'hello pinia',
      nested: {
        data: 'nested pinia',
      },
    }
  },
  // 所有数据持久化
  // persist: true,
  // 持久化存储插件其他配置
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'storekey',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['nested.data'],
  },
})

```
