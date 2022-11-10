<template>
  <nav class="sideMenu">
    <perfect-scrollbar class="sideMenu__scrollbar-container">
      <ul class="sideMenu__list">
        <li class="sideMenu__item">
          <a href="#" class="sideMenu__link sideMenu__link--logout">
            <svg><use xlink:href="@/assets/images/sprite.svg#arrow"></use></svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a
            href="#"
            class="sideMenu__link sideMenu__link--page"
            :class="{active: activeLink === 'home'}"
          >
            <svg><use xlink:href="@/assets/images/sprite.svg#house"></use></svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a
            href="#"
            class="sideMenu__link sideMenu__link--page"
            :class="{active: activeLink === 'clients'}"
          >
            <svg>
              <use xlink:href="@/assets/images/sprite.svg#wireless"></use>
            </svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a
            href="#"
            class="sideMenu__link sideMenu__link--page"
            :class="{active: activeLink === 'errors-group'}"
          >
            <svg>
              <use xlink:href="@/assets/images/sprite.svg#warning"></use>
            </svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a
            href="#"
            class="sideMenu__link sideMenu__link--page"
            :class="{active: activeLink === 'errors-base'}"
          >
            <svg><use xlink:href="@/assets/images/sprite.svg#book"></use></svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a
            href="#"
            class="sideMenu__link sideMenu__link--page"
            :class="{active: activeLink === 'licenses'}"
          >
            <svg><use xlink:href="@/assets/images/sprite.svg#lock"></use></svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a
            href="#"
            class="sideMenu__link sideMenu__link--page"
            :class="{active: activeLink === 'users'}"
          >
            <svg><use xlink:href="@/assets/images/sprite.svg#users"></use></svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a
            href="#"
            class="sideMenu__link sideMenu__link--page"
            :class="{active: activeLink === 'events-log'}"
          >
            <svg><use xlink:href="@/assets/images/sprite.svg#list"></use></svg>
          </a>
        </li>
        <li class="sideMenu__item">
          <a href="#" class="sideMenu__link sideMenu__link--user">
            <span class="sideMenu__avatar-wrapper">
              <img src="@/assets/images/avatar.jpg" alt="" />
            </span>
          </a>
        </li>
      </ul>
    </perfect-scrollbar>
  </nav>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    activeLink: {
      type: String,
    },
  },
}
</script>
