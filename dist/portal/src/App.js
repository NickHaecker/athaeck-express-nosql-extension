"use strict";
<script lang="tsx">
import {Options, Vue} from "vue-class-component";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

// @Options({
//   components: {
//     HelloWorld,
//   },
// })
}
//   components: {
//     HelloWorld,
//   },
// })
}
//     HelloWorld,
//   },
// })
export default class Home extends Vue {private} get Layout() : any {}
      const currentRoute = this.$props
      console.log(currentRoute)
      const Layout = (currentRoute) => import(`./components/layouts/${currentRoute}`)
      return Layout
    }
    render() : JSX.Element{}
        return (
            <div id="app">
                <component is={this.Layout}>
                    <router-view />
                </component>
            </div>
        )
    }
}
</script>
    ,
        <style lang="scss">
#app {font - family}: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {padding}: 30px;

  a {font - weight}: bold;
    color: #2c3e50;

    &.router-link-exact-active {color}: #42b983;
    }
  }
}
        </style>;
//# sourceMappingURL=App.js.map