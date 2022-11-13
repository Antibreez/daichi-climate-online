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
              <icon id="small-arrow" />
            </a>
          </div>
          <div class="dashboard__error-devices-data-list data-list">
            <!-- СТРОКА ПОИСКА И ФИЛЬТРАЦИИ -->
            <div class="data-list__bar">
              <search
                :onInput="deviceSearchInputHandler"
                :onClear="deviceSearchClearHandler"
                class="data-list__search"
                placeholder="Поиск по названию устройства или данным владельца"
              />
              <filter-button class="data-list__filter" :isActive="!isFiltersEmpty" @click="filtersButtonHandler" />

              <!-- МОДАЛКА С ФИЛЬТРАМИ -->
              <filters-modal
                :class="{opened: isFiltersModalOpened}"
                :onClose="closeFiltersModalHandler"
                :onReset="resetFiltersModalHandler"
                :isResetDisabled="isFiltersPicked"
              >
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="new"
                  text="Только новые"
                  :count="2"
                  :onChange="typeFilterChangeHandler"
                  :isChecked="pickedFilters.type.includes('new')"
                />
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="controllers"
                  text="Только контроллеры"
                  :count="11"
                  :onChange="typeFilterChangeHandler"
                  :isChecked="pickedFilters.type.includes('controllers')"
                />
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="clouds"
                  text="Только Облачные кондиционеры"
                  :count="11"
                  :onChange="typeFilterChangeHandler"
                  :isChecked="pickedFilters.type.includes('clouds')"
                />
                <checkbox
                  class="filtersModal__checkbox"
                  inputName="clients-requests"
                  text="С заявками от клиентов"
                  :count="2"
                  :onChange="typeFilterChangeHandler"
                  :isChecked="pickedFilters.type.includes('clients-requests')"
                />
                <!-- ЧЕКБОКС ВЫБОРА ГОРОДА -->
                <checkbox-button
                  class="filtersModal__checkbox-button"
                  :isChecked="this.pickedFilters.cities.length > 0"
                  text="Выбрать город"
                  :count="this.pickedFilters.cities.length"
                  :onClick="citiesPickClickHandler"
                />
                <!-- ЧЕКБОКС ВЫБОРА СЕРВИСНОГО ЦЕНТРА -->
                <checkbox-button
                  class="filtersModal__checkbox-button"
                  :isChecked="this.pickedFilters.services.length > 0"
                  text="Выбрать сервисный центр"
                  :count="this.pickedFilters.services.length"
                  :onClick="servicesPickClickHandler"
                />
                <app-button
                  class="filtersModal__submit"
                  text="Применить"
                  :disabled="areActiveAndPickedFiltersEqual"
                  @click="submitFilters"
                />
              </filters-modal>

              <!-- МОДАЛКА С ВЫБОРОМ ГОРОДОВ -->
              <modal
                class="pick-modal"
                :class="{opened: isCitiesModalOpened}"
                title="Выбрать город"
                desc="Выберите город или города, чтобы применить фильтр."
                :onClose="citiesPickCloseHandler"
              >
                <search
                  :onInput="citySearchInputHandler"
                  :onClear="citySearchClearHandler"
                  class="pick-modal__search"
                  placeholder="Укажите название города в поиске"
                  :needToClear="needToClearCityValue"
                />
                <p v-if="currentlyPickedCities.length > 0" class="pick-modal__selected">
                  Выбрано ({{ currentlyPickedCities.length }})
                </p>
                <h4 v-if="citySearchValue.trim() === ''" class="pick-modal__list-title">Частые запросы:</h4>
                <ul v-if="filteredCities.length > 0" class="pick-modal__list">
                  <li v-for="city in filteredCities" :key="city.city" class="pick-modal__item">
                    <checkbox
                      class="pick-modal__checkbox"
                      :inputName="city.city"
                      :text="city.city"
                      :isChecked="currentlyPickedCities.includes(city.city)"
                      :onChange="cityFilterChangeHandler"
                    />
                  </li>
                </ul>
                <p v-if="filteredCities.length === 0" class="pick-modal__not-found">Ничего не найдено</p>
                <div class="modal__bottom">
                  <app-button
                    text="Сохранить"
                    :disabled="this.currentlyPickedCities.length === this.pickedFilters.cities.length"
                    @click="submitCities"
                  />
                </div>
              </modal>

              <!-- МОДАЛКА С ВЫБОРОМ СЕРВИСНЫХ ЦЕНТРОВ -->
              <modal
                class="pick-modal"
                :class="{opened: isServicesModalOpened}"
                title="Выбрать сервисный центр"
                desc="Выберите сервисный центр, чтобы применить фильтр."
                :onClose="servicesPickCloseHandler"
              >
                <search
                  :onInput="serviceSearchInputHandler"
                  :onClear="serviceSearchClearHandler"
                  class="pick-modal__search"
                  placeholder="Укажите название сервисного центра в поиске"
                  :needToClear="needToClearServiceValue"
                />
                <h4 v-if="serviceSearchValue.trim() === ''" class="pick-modal__list-title">Частые запросы:</h4>
                <ul v-if="filteredServices.length > 0" class="pick-modal__list">
                  <li v-for="service in filteredServices" :key="service.service" class="pick-modal__item">
                    <checkbox
                      class="pick-modal__checkbox"
                      :inputName="service.service"
                      :text="service.service"
                      :isChecked="currentlyPickedServices.includes(service.service)"
                      :onChange="serviceFilterChangeHandler"
                    />
                  </li>
                </ul>
                <p v-if="filteredServices.length === 0" class="pick-modal__not-found">Ничего не найдено</p>
                <div class="modal__bottom">
                  <app-button
                    text="Сохранить"
                    :disabled="this.currentlyPickedServices.length === this.pickedFilters.services.length"
                    @click="submitServices"
                  />
                </div>
              </modal>
            </div>

            <p v-if="true" class="data-list__search-result">Устройств с ошибками не обнаружено</p>
            <p v-if="true" class="data-list__search-result">Найдено: 1</p>
            <p v-if="true" class="data-list__search-result">
              По поисковому запросу "{{ deviceSearchValue }}" ничего не найдено.
            </p>

            <div class="data-list__content">
              <!-- СТРОКА СОРТИРОВКИ -->
              <div class="data-list__sorting">
                <div class="data-list__sorting-item">
                  <button
                    class="data-list__sorting-button"
                    :class="{
                      'active-down': sorting.type === 'name' && sorting.direction === 'down',
                      'active-up': sorting.type === 'name' && sorting.direction === 'up',
                    }"
                    @click="onSortingButtonClick('name', $event)"
                  >
                    <span class="data-list__sorting-text">Название</span>
                    <span class="data-list__sorting-button-icon">
                      <icon id="arrow" />
                    </span>
                  </button>
                </div>
                <div class="data-list__sorting-item">
                  <button
                    class="data-list__sorting-button"
                    :class="{
                      'active-down': sorting.type === 'errors' && sorting.direction === 'down',
                      'active-up': sorting.type === 'errors' && sorting.direction === 'up',
                    }"
                    @click="onSortingButtonClick('errors', $event)"
                  >
                    <span class="data-list__sorting-text">Ошибки</span>
                    <span class="data-list__sorting-button-icon">
                      <icon id="arrow" />
                    </span>
                  </button>
                </div>
                <div class="data-list__sorting-item">
                  <button
                    class="data-list__sorting-button"
                    :class="{
                      'active-down': sorting.type === 'last-error-date' && sorting.direction === 'down',
                      'active-up': sorting.type === 'last-error-date' && sorting.direction === 'up',
                    }"
                    @click="onSortingButtonClick('last-error-date', $event)"
                  >
                    <span class="data-list__sorting-text">Последняя ошибка</span>
                    <span class="data-list__sorting-button-icon">
                      <icon id="arrow" />
                    </span>
                  </button>
                </div>
                <div class="data-list__sorting-item">
                  <div class="data-list__sorting-title">Владелец</div>
                </div>
                <div class="data-list__sorting-item">
                  <button
                    class="data-list__sorting-button"
                    :class="{
                      'active-down': sorting.type === 'city' && sorting.direction === 'down',
                      'active-up': sorting.type === 'city' && sorting.direction === 'up',
                    }"
                    @click="onSortingButtonClick('city', $event)"
                  >
                    <span class="data-list__sorting-text">Город</span>
                    <span class="data-list__sorting-button-icon">
                      <icon id="arrow" />
                    </span>
                  </button>
                </div>
                <div class="data-list__sorting-item">
                  <div class="data-list__sorting-title">Заявка</div>
                </div>
                <div class="data-list__sorting-item">
                  <div class="data-list__sorting-title">Климат Онлайн</div>
                </div>
                <div class="data-list__sorting-item"></div>
              </div>

              <!-- СТРОКИ УСТРОЙСТВ С ОШИБКАМИ -->
              <a
                href="#"
                v-for="device in ERROR_DEVICES.slice(0, 10)"
                :key="device.id"
                class="data-list__row"
                @click="onDeviceClick"
              >
                <div class="data-list__row-item">
                  <span class="data-list__main-text data-list__main-text--strong">
                    {{ device.name }}
                  </span>
                  <span v-if="device.new" class="data-list__new-label"> Hoвая </span>
                </div>
                <div class="data-list__row-item">
                  <span class="data-list__alert-text">{{ device.errors }}</span>
                </div>
                <div class="data-list__row-item">
                  <span class="data-list__main-text">
                    {{ device['last-error-date'] }}
                  </span>
                </div>
                <div class="data-list__row-item">
                  <span class="data-list__main-text data-list__main-text--strong">{{ device.owner.name }}</span>
                  <span class="data-list__secondary-text">
                    {{ device.owner.email }}
                  </span>
                  <span class="data-list__secondary-text">
                    {{ device.owner.phone }}
                  </span>
                </div>
                <div class="data-list__row-item">
                  <span class="data-list__main-text">{{ device.city }}</span>
                  <span class="data-list__secondary-text">
                    {{ device['service-center'] }}
                  </span>
                </div>
                <div class="data-list__row-item">
                  <span class="data-list__presence-text">
                    <span v-if="device.request">Да</span>
                    <span v-if="!device.request">-</span>
                  </span>
                </div>
                <div class="data-list__row-item">
                  <span class="data-list__main-text">{{ device.expires }}</span>
                </div>
                <div class="data-list__row-item">
                  <button
                    class="data-list__comment"
                    @click="commentButtonClickHandler(device.id, device.comment, $event)"
                  >
                    <icon v-if="!device.comment" id="comment-plus" class="data-list__comment-empty" />
                    <icon v-if="device.comment" id="comment" class="data-list__comment-filled" />
                    <span v-if="device.comment" class="data-list__comment-text">
                      {{ device.comment }}
                    </span>
                  </button>
                </div>
              </a>

              <button type="button" class="data-list__show-more">Показать ещё</button>

              <!-- МОДАЛКА РЕДАКТИРОВАНИЯ/ДОБАВЛЕНИЯ КОММЕНТАРИЯ -->
              <modal
                :title="commentModalTitle"
                :class="{opened: isCommentModalOpened}"
                :onClose="closeCommentModalHandler"
              >
                <app-input
                  label="Комментарий"
                  :hasErrorMessage="false"
                  :inputValue="commentInputValue"
                  :onInput="inputCommentHandler"
                />
                <div class="modal__bottom">
                  <app-button text="Сохранить" :disabled="this.currentComment === this.newComment" />
                </div>
              </modal>
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
import CheckboxButton from '@/components/common/CheckboxButton'
import appButton from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Icon from '@/components/common/Icon'
import AppInput from '@/components/common/Input'

import {areObjectsEqual, areObjectKeysEmpty, copyObject} from '@/helpers/common'

//ВРЕМЕННЫЕ ДАННЫЕ ГОРОДОВ ДЛЯ ВЕРСТКИ
import {CITIES} from '@/mock/cities'

//ВРЕМЕННЫЕ ДАННЫЕ СЕРВИСНЫХ ЦЕНТРОВ ДЛЯ ВЕРСТКИ
import {SERVICES} from '@/mock/services'

//ВРЕМЕННЫЕ ДАННЫЕ УСТРОЙСТВ С ОШИБКАМИ ДЛЯ ВЕРСТКИ
import ERROR_DEVICES from '@/mock/error-devices.json'

export default {
  name: 'Dashboard',
  components: {
    SideMenu,
    DeviceChip,
    Search,
    FilterButton,
    FiltersModal,
    Checkbox,
    CheckboxButton,
    appButton,
    Modal,
    Icon,
    AppInput,
  },
  data() {
    return {
      ERROR_DEVICES,

      //ПЕРЕМЕННЫЕ ДЛЯ ФИЛЬТРОВ
      isFiltersModalOpened: false,
      isCitiesModalOpened: false,
      isServicesModalOpened: false,
      citySearchValue: '',
      needToClearCityValue: false,
      serviceSearchValue: '',
      needToClearServiceValue: false,

      //ПЕРЕМЕННАЯ СО ЗНАЧЕНИЕМ ПОИСКА УСТРОЙСТВА
      deviceSearchValue: '',

      //ПЕРЕМЕННЫЕ ДЛЯ РЕДАКТИРОВАНИЯ/ДОБАВЛЕНИЯ КОММЕНТАРИЯ
      commentModalTitle: '',
      commentInputValue: null,
      currentComment: '',
      newComment: '',
      isCommentModalOpened: false,

      //ФИЛЬТРЫ ПРИМЕНЁННЫЕ К СПИСКУ УСТРОЙСТВ
      activeFilters: {
        type: [],
        cities: [],
        services: [],
      },

      //ФИЛЬТРЫ ВЫБРАННЫЕ В ОТКРЫТОМ ОКНЕ ФИЛЬТРОВ
      pickedFilters: {
        type: [],
        cities: [],
        services: [],
      },

      //ФИЛЬТРЫ ВЫБРАННЫЕ В ОТКРЫТОМ ОКНЕ ВЫБОРА ГОРОДОВ
      currentlyPickedCities: [],

      //ФИЛЬТРЫ ВЫБРАННЫЕ В ОТКРЫТОМ ОКНЕ ВЫБОРА СЕРВИСНЫХ ЦЕНТРОВ
      currentlyPickedServices: [],

      //ТЕКУЩИЙ ТИП СОРТИРОВКИ И НАПРАВЛЕНИЕ СОРТИРОВКИ
      sorting: {
        type: '',
        direction: '',
      },
    }
  },
  computed: {
    areActiveAndPickedFiltersEqual() {
      return areObjectsEqual(this.activeFilters, this.pickedFilters)
    },
    isFiltersEmpty() {
      return areObjectKeysEmpty(this.activeFilters)
    },
    isFiltersPicked() {
      return areObjectKeysEmpty(this.pickedFilters)
    },
    filteredCities() {
      if (this.citySearchValue.trim() === '') {
        return CITIES.filter(city => city.popular === true)
      }

      return CITIES.filter(city => city.city.toLowerCase().includes(this.citySearchValue.trim().toLowerCase()))
    },
    filteredServices() {
      if (this.serviceSearchValue.trim() === '') {
        return SERVICES.filter(service => service.popular === true)
      }

      return SERVICES.filter(service =>
        service.service.toLowerCase().includes(this.serviceSearchValue.trim().toLowerCase())
      )
    },
  },
  methods: {
    //============ МЕТОДЫ ПОИСКА УСТРОЙСТВ =============
    deviceSearchInputHandler(e) {
      //Берём this.deviceSearchValue и меняем список отображаемых устройств
      this.deviceSearchValue = e.target.value
      console.log(e.target.value)
    },
    deviceSearchClearHandler() {
      //Сбрасываем список устройств до начального состояния
      this.deviceSearchValue = ''
      console.log('search cleared')
    },

    //============ МЕТОДЫ МОДАЛКИ С ФИЛЬТРАМИ ПЕРВОГО УРОВНЯ (ТОЛЬКО НОВЫЕ, ТОЛЬКО КОНТРОЛЛЕРЫ.....)=============
    //ОТКРЫВАЕМ МОДАЛКУ С ФИЛЬТРАМИ
    filtersButtonHandler() {
      this.isFiltersModalOpened = true
      document.body.classList.add('js-no-scroll')
    },
    //МЕНЯЕМ ЧЕКБОКСЫ ФИЛЬТРОВ
    typeFilterChangeHandler(name, checked) {
      const idx = this.pickedFilters.type.indexOf(name)

      checked ? (this.pickedFilters.type = [...this.pickedFilters.type, name]) : this.pickedFilters.type.splice(idx, 1)
    },
    //НАЖИМАЕМ НА СБРОС ФИЛЬТРОВ
    resetFiltersModalHandler() {
      Object.keys(this.pickedFilters).forEach(key => {
        this.pickedFilters[key] = []
      })
      this.currentlyPickedCities = []
    },
    //ЗАКРЫВАЕМ МОДАЛКУ ФИЛЬТРОВ БЕЗ СОХРАНЕНИЯ
    closeFiltersModalHandler() {
      this.isFiltersModalOpened = false
      this.pickedFilters = copyObject(this.activeFilters)
      this.currentlyPickedCities = [...this.activeFilters.cities]
      document.body.classList.remove('js-no-scroll')
    },
    //ЗАКРЫВАЕМ МОДАЛКУ ФИЛЬТРОВ С СОХРАНЕНИЕМ
    submitFilters() {
      this.activeFilters = copyObject(this.pickedFilters)
      this.currentlyPickedCities = [...this.activeFilters.cities]
      this.isFiltersModalOpened = false
      document.body.classList.remove('js-no-scroll')

      //Берём this.activeFilters и меняем список отображаемых устройств
      console.log(this.activeFilters)
    },

    //============ МЕТОДЫ МОДАЛКИ С ФИЛЬТРАМИ ВТОРОГО УРОВНЯ (ГОРОДА)=================
    //НАЖИМАЕМ НА ЧЕКБОКС ВЫБОРА ГОРОДА
    citiesPickClickHandler() {
      this.isCitiesModalOpened = true
      this.needToClearCityValue = false
    },
    //МЕНЯЕМ ЧЕКБОКСЫ ГОРОДОВ
    cityFilterChangeHandler(name, checked) {
      const idx = this.currentlyPickedCities.indexOf(name)

      checked
        ? (this.currentlyPickedCities = [...this.currentlyPickedCities, name])
        : this.currentlyPickedCities.splice(idx, 1)
    },
    //СОБЫТИЕ ПРИ ВВОДЕ В ПОЛЕ ПОИСКА ГОРОДОВ
    citySearchInputHandler(e) {
      this.citySearchValue = e.target.value
    },
    //СОБЫТИЕ ПРИ ОЧИСТКЕ ПОЛЯ ПОИСКА ГОРОДОВ
    citySearchClearHandler() {
      this.citySearchValue = ''
    },
    //ЗАКРЫВАЕМ МОДАЛКУ ВЫБОРА ГОРОДОВ БЕЗ СОХРАНЕНИЯ
    citiesPickCloseHandler() {
      this.isCitiesModalOpened = false
      this.currentlyPickedCities = [...this.pickedFilters.cities]
      this.needToClearCityValue = true
      this.citySearchValue = ''
    },
    //ЗАКРЫВАЕМ МОДАЛКУ ВЫБОРА ГОРОДОВ С СОХРАНЕНИЕМ
    submitCities() {
      this.isCitiesModalOpened = false
      this.pickedFilters.cities = [...this.currentlyPickedCities]
      this.needToClearCityValue = true
      this.citySearchValue = ''
    },

    //============ МЕТОДЫ МОДАЛКИ С ФИЛЬТРАМИ ВТОРОГО УРОВНЯ (СЕРВИСНЫЕ ЦЕНТРЫ)=================
    //НАЖИМАЕМ НА ЧЕКБОКС ВЫБОРА СЕРВИСНОГО ЦЕНТРА
    servicesPickClickHandler() {
      this.isServicesModalOpened = true
      this.needToClearServiceValue = false
    },
    //МЕНЯЕМ ЧЕКБОКСЫ СЕРВИСНЫХ ЦЕНТРОВ
    serviceFilterChangeHandler(name, checked) {
      const idx = this.currentlyPickedServices.indexOf(name)

      checked
        ? (this.currentlyPickedServices = [...this.currentlyPickedServices, name])
        : this.currentlyPickedServices.splice(idx, 1)
    },
    //СОБЫТИЕ ПРИ ВВОДЕ В ПОЛЕ ПОИСКА СЕРВИСНЫХ ЦЕНТРОВ
    serviceSearchInputHandler(e) {
      this.serviceSearchValue = e.target.value
    },
    //СОБЫТИЕ ПРИ ОЧИСТКЕ ПОЛЯ ПОИСКА СЕРВИСНЫХ ЦЕНТРОВ
    serviceSearchClearHandler() {
      this.serviceSearchValue = ''
    },
    //ЗАКРЫВАЕМ МОДАЛКУ ВЫБОРА СЕРВИСНЫХ ЦЕНТРОВ БЕЗ СОХРАНЕНИЯ
    servicesPickCloseHandler() {
      this.isServicesModalOpened = false
      this.currentlyPickedServices = [...this.pickedFilters.services]
      this.needToClearServiceValue = true
      this.serviceSearchValue = ''
    },
    //ЗАКРЫВАЕМ МОДАЛКУ ВЫБОРА СЕРВИСНЫХ ЦЕНТРОВ С СОХРАНЕНИЕМ
    submitServices() {
      this.isServicesModalOpened = false
      this.pickedFilters.services = [...this.currentlyPickedServices]
      this.needToClearServiceValue = true
      this.serviceSearchValue = ''
    },

    //============ МЕТОДЫ МОДАЛКИ С РЕДАКТИРОВАНИЕМ/ДОБАВЛЕНИЕМ КОММЕНТАРИЯ К УСТРОЙСТВУ ================
    commentButtonClickHandler(id, comment) {
      this.currentComment = comment
      this.newComment = comment
      const device = ERROR_DEVICES.find(device => device.id === id)
      const hasComment = !!comment

      hasComment
        ? (this.commentModalTitle = 'Редактировать комментарий')
        : (this.commentModalTitle = 'Добавить комментарий')
      this.commentInputValue = comment

      this.isCommentModalOpened = true

      console.log(device)
    },
    inputCommentHandler(val) {
      this.newComment = val
    },
    closeCommentModalHandler() {
      this.isCommentModalOpened = false
      this.commentInputValue = null
      this.currentComment = ''
      this.newComment = ''
    },

    //============ МЕТОД НАЖАТИЯ НА КНОПКИ СОРТИРОВКИ ================
    onSortingButtonClick(type) {
      if (this.sorting.type === type) {
        this.sorting.direction === 'up' ? (this.sorting.direction = 'down') : (this.sorting.direction = 'up')
      } else {
        this.sorting.type = type
        this.sorting.direction = 'down'
      }

      //Сортируем список устройств в соответствии с типом this.sorting.type и направлением сортировки this.sorting.direction
    },

    //============ МЕТОД НАЖАТИЯ НА УСТРОЙСТВО ================
    onDeviceClick(e) {
      if (e.target.closest('.data-list__comment')) {
        e.preventDefault()
        console.log('comment click')
        return
      }

      console.log('device click')
    },
  },
}
</script>
