<template>
  <div class="page page--side-menu">
    <side-menu activeLink="home" />
    <div class="dashboard">
      <div class="dashboard__wrapper wrapper">
        <h1 class="dashboard__title h1">Добрый день, Иван Иванович!</h1>
        <div class="dashboard__devices-all">
          <div class="dashboard__devices-all-chip">
            <device-chip type="error-devices" :count="13" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="active-devices" :count="56" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="controllers" :count="35" :errors="11" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="remotes" :count="5" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="clouds" :count="16" :errors="2" />
          </div>
        </div>
        <div class="dashboard__error-devices">
          <div class="title-block">
            <h2 class="h2 title-block__title">Устройства с ошибками</h2>
            <a href="#" class="link title-block__link">
              Все устройства
              <svg>
                <use xlink:href="@/assets/images/sprite.svg#small-arrow"></use>
              </svg>
            </a>
          </div>
          <div class="dashboard__error-devices-data-list data-list">
            <div class="data-list__bar">
              <search
                :onInput="onSearchInput"
                :onClear="onSearchClear"
                class="data-list__search"
              />
              <filter-button
                class="data-list__filter"
                :isActive="false"
                @click="filtersButtonHandler"
              />
              <filters-modal
                :class="{opened: isFiltersModalOpened}"
                :onClose="closeFiltersModalHandler"
                :onReset="resetFiltersModalHandler"
              >
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="new"
                  text="Только новые"
                  :count="2"
                  :onChange="onTypeFilterChange"
                  :isChecked="pickedFilters.type.includes('new')"
                />
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="controllers"
                  text="Только контроллеры"
                  :count="11"
                  :onChange="onTypeFilterChange"
                  :isChecked="pickedFilters.type.includes('controllers')"
                />
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="clouds"
                  text="Только Облачные кондиционеры"
                  :count="11"
                  :onChange="onTypeFilterChange"
                  :isChecked="pickedFilters.type.includes('clouds')"
                />
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="clients-requests"
                  text="С заявками от клиентов"
                  :count="2"
                  :onChange="onTypeFilterChange"
                  :isChecked="pickedFilters.type.includes('clients-requests')"
                />
                <app-button
                  class="filtersModal__submit"
                  text="Применить"
                  :disabled="areActiveAndPickedFiltersEqual()"
                  @click="submitFilters"
                />
              </filters-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/common/SideMenu'
import DeviceChip from '@/components/Dashboard/DeviceChip'
import Search from '@/components/common/Search'
import FilterButton from '@/components/common/FilterButton'
import FiltersModal from '../components/common/FiltersModal'
import Checkbox from '@/components/common/Checkbox'
import appButton from '@/components/common/Button'

export default {
  name: 'Dashboard',
  components: {
    SideMenu,
    DeviceChip,
    Search,
    FilterButton,
    FiltersModal,
    Checkbox,
    appButton,
  },
  data() {
    return {
      isFiltersModalOpened: false,
      activeFilters: {
        type: [],
        cities: [],
        services: [],
      },
      pickedFilters: {
        type: [],
        cities: [],
        services: [],
      },
    }
  },
  methods: {
    onSearchInput(e) {
      //Обрабатываем значение поиска при вводе
      console.log(e.target.value)
    },
    onSearchClear() {
      //Обрабатываем сброс значения поиска
      console.log('search cleared')
    },
    onTypeFilterChange(name) {
      const idx = this.pickedFilters.type.indexOf(name)

      idx === -1
        ? (this.pickedFilters.type = [...this.pickedFilters.type, name])
        : this.pickedFilters.type.splice(idx, 1)
    },
    filtersButtonHandler() {
      this.isFiltersModalOpened = true
    },
    closeFiltersModalHandler() {
      this.isFiltersModalOpened = false
      this.pickedFilters = {...this.activeFilters}
    },
    submitFilters() {
      this.activeFilters = {...this.pickedFilters}
      this.isFiltersModalOpened = false

      //Обрабатываем activeFilters
      console.log(this.activeFilters)
    },
    resetFiltersModalHandler() {
      console.log('reset')
      Object.keys(this.pickedFilters).forEach(key => {
        this.pickedFilters[key] = []
      })
    },
    areActiveAndPickedFiltersEqual() {
      let equal = true
      Object.keys(this.activeFilters).forEach(key => {
        if (this.activeFilters[key].length !== this.pickedFilters[key].length) {
          equal = false
        }
      })
      return equal
    },
  },
}
</script>
