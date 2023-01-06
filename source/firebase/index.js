import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const createProducts = payload => {
  return new Promise((resolve, reject) => {
    try {
      firestore().collection('products').add(payload);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection('products')
        .get()
        .then(querySnapshot => {
          const data = [];
          querySnapshot.forEach(queryDocumentSnapshot => {
            data.push({
              ref: queryDocumentSnapshot._ref._documentPath._parts[1],
              ...queryDocumentSnapshot._data,
            });
          });
          resolve(data);
        });
    } catch (error) {
      console.log('error', error);
      reject(error);
    }
  });
};

export const fetchProduct = () => {
  return new Promise((resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

export const updateProduct = () => {
  return new Promise((resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteProduct = () => {
  return new Promise((resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

export const createUser = payload => {
  return new Promise((resolve, reject) => {
    try {
      auth()
        .createUserWithEmailAndPassword(payload.username, payload.password)
        .then(res => {
          console.log('User account created & signed in!', res);
          resolve(res.user);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            reject('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            reject('That email address is invalid!');
          }

          if (error.code === 'auth/weak-password') {
            reject('That password is weak!');
          }
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const signIn = payload => {
  return new Promise((resolve, reject) => {
    try {
      auth()
        .signInWithEmailAndPassword(payload.username, payload.password)
        .then(res => {
          const result = {
            ...res.user._user,
            authResult: res.user._auth._authResult,
          };
          resolve(result);
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            console.log(
              'The password is invalid or the user does not have a password.',
            );
            reject(
              'The password is invalid or the user does not have a password.',
            );
          }

          if (error.code === 'auth/invalid-email') {
            console.log('The email address is badly formatted.');
            reject('The email address is badly formatted.');
          }

          if (error.code === 'auth/user-not-found') {
            console.log(
              'There is no user record corresponding to this identifier. The user may have been deleted.',
            );
            reject(
              'There is no user record corresponding to this identifier. The user may have been deleted.',
            );
          }

          console.log('error', error);
          reject(error);
        });
    } catch (error) {
      console.log('error', error);
    }
  });
};
