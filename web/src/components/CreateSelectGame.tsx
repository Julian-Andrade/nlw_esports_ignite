// External Components
import * as Select from "@radix-ui/react-select";
// Icons
import { Check, CaretDown } from "phosphor-react";

export function CreateSelectGame() {
  return (
    <Select.Root>
      <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm  flex items-center justify-between">
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <Select.Icon>
          <CaretDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className="bg-zinc-900 py-3 px-4 rounded text-sm text-white">
        <Select.Content>
          <Select.ScrollUpButton>
            <CaretDown />
          </Select.ScrollUpButton>
          <Select.Viewport className="gap-2">
            <Select.Item value="CS:GO" className="flex items-center justify-between">
              <Select.ItemText>
                Counter-Strike: Global Offensive
              </Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="Ultima Online" className="flex items-center justify-between">
              <Select.ItemText>Ultima Online</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="Fortnite" className="flex items-center justify-between">
              <Select.ItemText>Fortnite</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="Path of Exile" className="flex items-center justify-between">
              <Select.ItemText>Path of Exile</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="Multiversus" className="flex items-center justify-between">
              <Select.ItemText>Multiversus</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="Valorant" className="flex items-center justify-between">
              <Select.ItemText>Valorant</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
          <Select.ScrollDownButton>
            <CaretDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
