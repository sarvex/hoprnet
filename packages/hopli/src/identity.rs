use crate::key_pair::{create_identity, read_identities};
use crate::password::PasswordArgs;
use clap::{builder::RangedU64ValueParser, Parser};
use std::{
    str::FromStr,
    time::{SystemTime, UNIX_EPOCH},
};

use crate::utils::{Cmd, HelperErrors};

#[derive(clap::ValueEnum, Debug, Clone, PartialEq, Eq)]
pub enum IdentityActionType {
    Create,
    Read,
}

impl FromStr for IdentityActionType {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "c" | "create" => Ok(IdentityActionType::Create),
            "r" | "read" => Ok(IdentityActionType::Read),
            _ => Err(format!("Unknown identity action: {s}")),
        }
    }
}

/// CLI arguments for `hopli identity`
#[derive(Parser, Clone, Debug)]
pub struct IdentityArgs {
    #[clap(
        value_enum,
        long,
        short,
        help_heading = "Identity action",
        help = "Action with identity `create` or `read`"
    )]
    pub action: IdentityActionType,

    #[clap(flatten)]
    password: PasswordArgs,

    #[clap(
        help = "Filepath to the identity file",
        long,
        short,
        default_value = "/tmp/hopli/identity.id"
    )]
    identity_filepath: String

}

impl IdentityArgs {
    /// Execute the command with given parameters
    fn execute_identity_creation_loop(self) -> Result<(), HelperErrors> {
        let IdentityArgs {
            action,
            password,
            identity_filepath
        } = self;

        // check if password is provided
        let pwd = match password.read_password() {
            Ok(read_pwd) => read_pwd,
            Err(e) => return Err(e),
        };

        let mut addresses = Vec::new();

        match action {
            IdentityActionType::Create => {

                match create_identity(&identity_filepath, &pwd) {
                    Ok(addr) => addresses.push(addr),
                    Err(_) => return Err(HelperErrors::UnableToCreateIdentity),
                }
            }
            IdentityActionType::Read => {
                // read ids
                match read_identities(&identity_filepath, &pwd) {
                    Ok(addrs) => addresses.extend(addrs),
                    Err(_) => return Err(HelperErrors::UnableToReadIdentity),
                }
            }
        }

        println!("Addresses from identities: {:?}", addresses);
        Ok(())
    }
}

impl Cmd for IdentityArgs {
    /// Run the execute_identity_creation_loop function
    fn run(self) -> Result<(), HelperErrors> {
        self.execute_identity_creation_loop()
    }
}
