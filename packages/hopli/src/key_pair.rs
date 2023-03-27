use ethers::core::{k256::ecdsa::SigningKey, rand::thread_rng};
use ethers::signers::Signer;
use ethers::signers::Wallet;
use ethers::types::Address;
use std::fs;
use std::path::Path;

/// Decrypt identity files and returns an vec of ethereum addresses
///
/// # Arguments
///
/// * `identity_directory` - Directory to all the identity files
/// * `password` - Password to unlock all the identity files
/// * `identity_prefix` - Prefix of identity files. Only identity files with the provided are decrypted with the password
pub fn read_identities(
    identity_file: &str,
    password: &String
) -> Result<Address, std::io::Error> {

    let signing_key: Wallet<SigningKey> = Wallet::<SigningKey>::decrypt_keystore(identity_file,password).ok().unwrap();
    let address = signing_key.address();
    Ok(address)
}

/// Create one identity file and return the ethereum address
///
/// # Arguments
///
/// * `dir_name` - Directory to the storage of an identity file
/// * `password` - Password to encrypt the identity file
/// * `name` - Prefix of identity files.
pub fn create_identity(
    identity_file: &str,
    password: &str
) -> Result<Address, std::io::Error> {
    // Get parent path
    let parent_dir = Path::new(identity_file).parent().unwrap();

    // create identity with the given password
    let (wallet, uuid) =
        Wallet::new_keystore(parent_dir, &mut thread_rng(), password, None).unwrap();

    // Rename keystore from uuid to uuid.id (or `name.id`, if provided)
    let old_file_path = format!("{}/{}", parent_dir.display(), uuid);

    // check if `name` is end with `.id`, if not, append it
    let new_file_path = if ! identity_file.ends_with(".id") {
        format!("{}/{}", parent_dir.display(), identity_file)
    } else {
        let identity_filename = Path::new(identity_file).file_name().unwrap().to_str().unwrap();
        format!("{}/{}.id", parent_dir.display(), identity_filename)
    };

    fs::rename(&old_file_path, &new_file_path)
        .map_err(|err| println!("{:?}", err))
        .ok();

    Ok(wallet.address())
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn create_identity_file() {
        let identity_file = "./identity.id";
        let password = "password_create";
        match create_identity(identity_file, password) {
            Ok(_) => assert!(true),
            _ => assert!(false),
        }
        remove_json_keystore(identity_file)
            .map_err(|err| println!("{:?}", err))
            .ok();
    }

    #[test]
    fn read_identity_with_correct_password() {
        let identity_file = "./identity_with_correct_password.id";
        let password = "password".to_owned();
        create_identity(identity_file, &password).unwrap();
        match read_identities(identity_file, &password) {
            Ok(val) => assert!(val.as_bytes().len() > 1),
            _ => assert!(false),
        }
        remove_json_keystore(identity_file)
            .map_err(|err| println!("{:?}", err))
            .ok();
    }

    #[test]
    fn read_identity_with_wrong_password() {
        let identity_file = "./identity_with_wrong_password.id";
        let password = "password";
        let wrong_password = "wrong_password".to_owned();
        create_identity(identity_file, password).unwrap();
        match read_identities(identity_file, &wrong_password) {
            Ok(val) => assert!(val.as_bytes().len() == 0),
            _ => assert!(false),
        }
        remove_json_keystore(identity_file)
            .map_err(|err| println!("{:?}", err))
            .ok();
    }

    #[test]
    fn read_identities_identity_file_non_exisintg() {
        let identity_file = "./identity_with_wrong_password.id";
        match read_identities(identity_file, &"".to_owned()) {
            Ok(val) => assert!(val.as_bytes().len() == 0),
            _ => assert!(false),
        }
    }


    fn remove_json_keystore(path: &str) -> Result<(), std::io::Error> {
        println!("remove_json_keystore {:?}", path);
        fs::remove_dir_all(path)
    }
}
