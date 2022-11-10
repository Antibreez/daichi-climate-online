<template>
  <div class="page page--side-menu">
    <side-menu activeLink="home" />
    <div class="dashboard">
      <div class="dashboard__wrapper wrapper">
        <h1 class="dashboard__title h1">Добрый день, Иван Иванович!</h1>
        <div class="dashboard__devices-all">
          <div class="dashboard__devices-all-chip">
            <device-chip type="error-devices" count="13" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="active-devices" count="56" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="controllers" count="35" errors="11" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="remotes" count="5" />
          </div>
          <div class="dashboard__devices-all-chip">
            <device-chip type="clouds" count="16" errors="2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/common/SideMenu'
import DeviceChip from '@/components/Dashboard/DeviceChip'

export default {
  name: 'Dashboard',
  components: {
    SideMenu,
    DeviceChip,
  },
}
</script>
