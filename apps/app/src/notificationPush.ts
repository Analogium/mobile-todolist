import { PushNotifications } from '@capacitor/push-notifications';

// État pour stocker le jeton de notification
let notificationToken = null;

export async function registerNotifications() {
    try {
      let permStatus = await PushNotifications.checkPermissions()
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions()
      }
  
      if (permStatus.receive === 'granted') {
        await PushNotifications.register()
      }
    } catch (error: any) { // Utilisation d'une assertion de type
      console.warn(error.message) // Accès à la propriété message en toute sécurité
    }
  }

export function addListeners() {
  let permStatus = null

  return Promise.all([
    PushNotifications.addListener('registration', (token) => {
      try {
        PushNotifications.checkPermissions().then((status) => {
          permStatus = status
          notificationToken = token.value;
          console.log(notificationToken);
          
        })
      } catch (e) {
        console.warn(e)
      }
    }),

    PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error)
    }),

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received: ', notification)
    }),

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue)
    }),
  ])
}

// Appel de registerNotifications et addListeners au lancement de l'application
registerNotifications()
addListeners()

// Exportation de la référence à l'état de notificationToken
export { notificationToken };
