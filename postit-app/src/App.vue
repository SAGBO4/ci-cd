<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <!-- Logo carnet simple en emoji -->
        <span class="notebook-emoji">📓</span>
        <h1 class="app-title">Mes Post-it</h1>

        <nav class="menu">
    <ul>
      <li>
        <router-link to="/">Accueil</router-link>
      </li>
      <li>
        <router-link to="/local">Notes locales</router-link>
      </li>
     
    </ul>
  </nav>
      </div>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Application Post-it de MICHAEL SAGBO - Tous droits réservés</p>
      </div>
    </footer>
  </div>
</template>

<script setup>

</script>

<style>
/* Styles pour le logo carnet */
.notebook-emoji {
  font-size: 2rem;
  margin-right: 0.75rem;
  display: inline-block;
  transition: transform 0.3s ease;
}

.notebook-emoji:hover {
  transform: rotate(10deg);
}

/* Le reste des styles existants */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e293b;
}

.app-main {
  flex-grow: 1;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.app-footer {
  background-color: #1e293b;
  color: #ffffff;
  padding: 1.5rem 0;
  text-align: center;
}


.menu {
  margin-left: auto; 
}

.menu ul {
  display: flex;        
  gap: 1rem;            
  list-style: none;     
  margin: 0;
  padding: 0;
}

.menu li {
  
}

.menu li a {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #1e293b;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.menu li a:hover {
  background-color: #007bff;
}

</style>